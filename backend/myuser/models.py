from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile = models.ImageField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)


class FollowedUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following') #current user
    followed_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_users')#id of current user followed user

    class Meta:
        unique_together = ('user_id', 'followed_user_id')
    
# Create your models here.
