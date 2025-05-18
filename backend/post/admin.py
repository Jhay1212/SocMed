from django.contrib import admin
from .models import Post, Comments


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'media', 'date_created', 'date_updated', 'uuid_field')


@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'date_created', 'date_updated')

# Register your mofromdels here.
