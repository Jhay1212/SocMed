from rest_framework import serializers
from post.models import Post, Comment
from myuser.models import User, FollowedUser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        
        return token
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'likes', 'dislike', 'media', 'date_created', 'date_updated', 'user']


class UserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    followed = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def get_followers(self):
        return [user.username for user in self.followers.all()]

    def get_followed(self, obj):
        return [user.username for user in self.followed.all()]
    

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
        
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']


# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     class Meta:
class FollowedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowedUser
        fields = ['id', 'follower', 'followed']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'date_created', 'date_updated', 'user', 'post']