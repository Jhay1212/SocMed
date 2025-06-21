from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image
from .manager import UserManager
from django.conf import settings

from django.urls import reverse
import os

def upload_to(instance, filename):
    return 'users/profile/{username}/{filename}'.format(username=instance.username, filename=filename)


class User(AbstractUser):
    status_choices = (
        ('online', 'Online'),
        ('offline', 'Offline')
    )
    username = models.CharField(max_length=64, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    profile = models.ImageField(null=True, blank=True, upload_to=upload_to, default=os.path.join(settings.MEDIA_ROOT, 'users/profile/default/avatar.png'))
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True, default='Not specified')
    staatus = models.CharField(max_length=20, choices=status_choices, default='Offline')
    def get_absolute_url(self):
        return reverse('profile', kwargs={'pk': self.id})
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


        if self.profile:
            img = Image.open(self.profile.path)

            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.profile.path)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()


class FollowedUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following') #current user
    followed_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_users')#id of current user followed user
    date_followed = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'followed_user_id'], name='unique_followers')
        ]
        ordering = ['-date_followed']
    
    def __str__(self):
        return self.user_id.username + ' follows ' + self.followed_user_id.username
# Create your models here.
