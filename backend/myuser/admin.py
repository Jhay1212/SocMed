from django.contrib import admin
from .models import User, FollowedUser

admin.site.register(User)
# Register your models here.
admin.site.register(FollowedUser)