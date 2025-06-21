from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from community.models import Community
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import json

from post.models import Post, Comments
from myuser.models import User, FollowedUser

import os 

class FollowedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowedUser
        fields = ['id', 'follower', 'followed']
class ProfileSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(use_url=True, required=False)
    class Meta:
        model = User
        fields =  ['username', 'email', 'profile']

class PostSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)
    comments = serializers.StringRelatedField(many=True)
    likes = serializers.ReadOnlyField()
    dislike = serializers.ReadOnlyField()
    media = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Post
        fields = ['id','uuid_field',  'title', 'content', 'likes', 'dislike', 
                  'media', 'date_created', 'date_updated', 'user', 'comments']



class UserSerializer(serializers.ModelSerializer):
    followed_users = serializers.StringRelatedField(many=True, read_only=True)
    profile = serializers.ImageField(use_url=True, required=False)
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile', 'followed_users', 'posts', 'status']

    def get_followed_users(self, obj):
        return [user for user in obj.followed_users.all()]

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile', 'followed_users', 'posts']


    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['user']= UserSerializer(self.user).data
        print(data)
        return data
    
class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comments
        fields = ['id', 'content', 'date_created', 'date_updated', 'owner', 'post']





class RegisterSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(use_url=True, required=False)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs.get('profile') is None:
            attrs['profile'] = 'users/profile/default/avatar.png'

        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs
    
    class Meta:
        model = User
        fields = ['id', 'profile', 
        'username', 'email', 'password', 'password2']

    def create(self, validated_data):
        validated_data.pop('password2') 
        print(validated_data)
        user =User.objects.create_user(username=validated_data['username'], 
                                       email= validated_data['email'],
                                        password=validated_data['password'])
        return user
        







class CommunitySerializer(serializers.ModelSerializer):
    users = serializers.ReadOnlyField(source='users.all')
    logo = serializers.ImageField(use_url=True, required=False)
    post = serializers.StringRelatedField(many=True)
    class Meta:
        model = Community
        fields = ['uuid', 'name', 'description', 'logo', 'users', 'post']