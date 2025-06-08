from django_filters import rest_framework as filters

from post.models import Post    
from community.models import Community
from myuser.models import User

class UserFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = ['username', 'email']

class PostFilter(filters.FilterSet):
    class Meta:
        model = Post
        fields = ['title', 'content']


class CommuntyFilter(filters.FilterSet):
    class Meta:
        model = Community
        fields = ['name', 'description']