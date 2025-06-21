from django.db import models
from django.db.models import Q

class PostManager(models.Manager):
    def search(self, query=None):
        if query is None:
            return self.get_queryset().none()
        lookups = Q(title__icontains=query) | Q(content__icontains=query)
        return self.get_queryset().filter(lookups)

    def get_all_posts(self):
        return self.get_queryset().all().order_by('?')
    
    def get_random_post(self):
        return self.get_queryset().order_by('?')
    
    def get_all_comments(self, post_id):
        obj = self.get_queryset().get(id=post_id)
        return obj.comments.all()
    
    def get_trending(self):
        return self.get_queryset().order_by('-likes')
