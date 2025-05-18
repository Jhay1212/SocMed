from django.db import models
from myuser.models import User
from post.models import Post
import uuid
# Create your models here.


def upload_to(instance, filename):
    return 'communities/{community}/{name}banners/{filename}'.format(community=instance.uuid, name=instance.name, filename=filename)
class Community(models.Model):
    uuid = models.UUIDField( primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    user = models.ManyToManyField(User, related_name='communities')
    post = models.ManyToManyField(Post, related_name='communities')
    name = models.CharField(max_length=200, null=True, verbose_name='name')
    description = models.CharField(max_length=256, null=True, verbose_name='description')
    logo  = models.ImageField(null=True, blank=True, upload_to=upload_to)
    date_created = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()



    def __str__(self):
        return super().__str__()