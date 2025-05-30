# Generated by Django 5.2 on 2025-05-18 13:49

import community.models
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('post', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200, null=True, verbose_name='name')),
                ('description', models.CharField(max_length=256, null=True, verbose_name='description')),
                ('logo', models.ImageField(blank=True, null=True, upload_to=community.models.upload_to)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('post', models.ManyToManyField(related_name='communities', to='post.post')),
                ('user', models.ManyToManyField(related_name='communities', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
