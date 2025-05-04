from django.db import models
from myuser.models import User
from django.core.errors import ValidationError
import json 

with open('banned_slurs.json') as f:
    BANNED_SLURS = json.load(f)['bag_of_slurs']



class DateTime(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def clean(self):
        if  self.date_created > self.date_updated:
            raise ValidationError('Date created cannot be before date updated')

    class Meta:
        abstract = True

class Post(models.Model, DateTime):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200,  null=False, blank=False)
    content = models.CharField(max_length=256)
    likes = models.IntegerField(default=0)
    dislike = models.IntegerField(default=1)
    media = models.ImageField(null=True, blank=True)


    def clean(self):
        for i in self.title.split():
            if i.lower() in BANNED_SLURS:
                for letter in i:
                    if letter.isalpha():
                        title = self.title.replace(letter, '*')
                        self.title = title
            raise ValidationError('Post title contains profanity')

        for i in self.content.split():
            if i.lower() in BANNED_SLURS:
                for letter in i:
                    if letter.isalpha():
                        content = self.content.replace(letter, '*')
                        self.content = content
                    raise ValidationError('Post body contains profanity')

    def post_create(*, title  , content, media, user):
        obj = Post(title=title, content=content, media=media, user=user)
        obj.full_clean()
        obj.save()
        return obj

    def __str__(self):
        return self.title
    

class Comments(models.Model, DateTime):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=256)

    def clean(self):
        for i in self.content.split():
            if i.lower() in BANNED_SLURS:
                for letter in i:
                    if letter.isalpha():
                        content = self.content.replace(letter, '*')
                        self.content = content
                    raise ValidationError('Post body contains profanity')
    def __str__(self):
        return self.content