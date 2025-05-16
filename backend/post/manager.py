from django.db.models import Q, BaseManager

class PostManager(BaseManager):
    def search(self, query=None):
        if query is None:
            return self.get_queryset().none()
        lookups = Q(title__icontains=query) | Q(content__icontains=query)
        return self.get_queryset().filter(lookups)
    
    def get_all_posts(self):
        return self.get_queryset().all()
    
    def get_random_post(self):
        return self.get_queryset().order_by('?').all()
    
    def get_all_comments_by_post(self, post_id):
        return self.get_queryset().filter(post=post_id).all()
    
    def get_trending (self):
        return self.get_queryset().order_by('-likes').all()