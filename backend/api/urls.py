from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

# 
url_patterns = [
    # path('', include(router.urls)),
]