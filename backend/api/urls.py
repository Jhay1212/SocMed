from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostViewSet, CommentViewSet, UserViewSet, CommunityViewSet, RegisterAPIView, LogoutView

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)
router.register(r'communities', CommunityViewSet)
router.register(r'comments', CommentViewSet)
# 
auth_urls = [
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterAPIView.as_view(), name='register'),
]

urlpatterns = router.urls + auth_urls