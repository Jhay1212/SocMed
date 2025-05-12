from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostViewSet, CommentViewSet

router = routers.DefaultRouter()


url_patterns = [
    path('', include('api.urls')),
]