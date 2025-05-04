from rest_framework import serializers
from post.models import Post, Comment
from myuser.models import User
from rest_framework.permissions import IsAuthenticated


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'likes', 'dislike', 'media', 'date_created', 'date_updated', 'user']

