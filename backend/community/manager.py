from django.db import models

class CommunityManager(models.Manager):
    def get_all_communities(self, user_id):
        return self.get_queryset().filter(user=user_id)
    
    def get_all_posts(self, community_id):
        return self.get_queryset().filter(post=community_id).all()
    
    def get_all_users(self, community_id):
        return self.get_queryset().filter(user=community_id).all()