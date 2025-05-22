from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from community.models import Community
from rest_framework.response import Response
from rest_framework import status

from post.models import Post, Comments
from myuser.models import User, FollowedUser


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        
        return token
    
class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comments
        fields = ['id', 'content', 'date_created', 'date_updated', 'owner', 'post']

class PostSerializer(serializers.ModelSerializer):
    comments = serializers.StringRelatedField(many=True)
    queryset = Post.objects.all().order_by('?')
    media = serializers.ImageField(use_url=True, required=False)
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'likes', 'dislike', 'media', 'date_created', 'date_updated', 'user', 'comments']



class UserSerializer(serializers.ModelSerializer):
    followed_users = serializers.SerializerMethodField()
    profile = serializers.ImageField(use_url=True, required=False)
    password = serializers.CharField(write_only=True, required=False)


    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile', 'followed_users']

    def get_followed_users(self, obj):
        return [user.username for user in obj.followed_users.all()]

    def get_following(self, obj):
        return [user.username for user in self.following.all()]
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs
    

    def create(self, validated_data):
        validated_data.pop('password2') 
        user =User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user
        




class FollowedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowedUser
        fields = ['id', 'follower', 'followed']



class CommunitySerializer(serializers.ModelSerializer):
    users = serializers.ReadOnlyField(source='users.all')
    logo = serializers.ImageField(use_url=True, required=False)
    class Meta:
        model = Community
        fields = ['id', 'name', 'description', 'logo', 'users']