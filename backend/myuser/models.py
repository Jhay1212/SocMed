from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image


def upload_to(instance, filename):
    return 'users/{filename}'.format(filename=filename)


class User(AbstractUser):
    profile = models.ImageField(null=True, blank=True, upload_to=upload_to)
    birth_date = models.DateField(null=True, blank=True)


class FollowedUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following') #current user
    followed_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_users')#id of current user followed user
    date_followed = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'followed_user_id'], name='unique_followers')
        ]
        ordering = ['-date_followed']
    
# Create your models here.
