from django.db import models
import uuid
from django.core.exceptions import ValidationError
from myuser.models import User
from django.utils.translation import gettext_lazy as _

import os 
import json 
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
with open(os.path.join(BASE_DIR, 'post', 'banned_words.json')) as f:
    BANNED_SLURS = json.load(f)['bag_of_slurs']



def censor_profanity(string):
    list_of_words = string.split()
    for word in list_of_words:
        if word.lower() in BANNED_SLURS:
            string = string.replace(word, '*' * len(word))
    return string

class DateTime(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    # def clean(self):
    #     if  self.date_created > self.date_updated:
    #         raise ValidationError('Date created cannot be before date updated')

    class Meta:
        abstract = True

class Post(DateTime):
    # uuid_field = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(
        _('title'),max_length=200,  null=True, blank=False)
    content = models.CharField(_('content'),max_length=256)
    likes = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    media = models.ImageField(null=True, blank=True)
    # video_url = models.URLField(null=True, blank=True)

    def clean(self):
        self.title  = censor_profanity(self.title)
        self.content = censor_profanity(self.content)

    def save(self, force_insert = ..., force_update = ..., using = ..., update_fields = ...):
        self.full_clean()
        super().save()
    def __str__(self):
        return self.title
    

class Comments(DateTime):
    # c_uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(_('content'), max_length=256)

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