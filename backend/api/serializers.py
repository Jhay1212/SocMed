from rest_framework import serializers
from post.models import Post, Comment
from myuser.models import User, FollowedUser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'likes', 'dislike', 'media', 'date_created', 'date_updated', 'user']


class UserSerializer(serializers.ModelSerializer):
    follower_count  = serializers.SerializerMethodField()
    followed_count = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def get_followers(self):
        return [user.username for user in self.followers.all()]

    def get_followed(self, obj):
        return [user.username for user in self.followed.all()]
    

class FollowedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowedUser
        fields = ['id', 'follower', 'followed']