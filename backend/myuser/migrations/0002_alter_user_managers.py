# Generated by Django 5.2 on 2025-05-11 14:02

import myuser.manager
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myuser', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', myuser.manager.UserManager()),
            ],
        ),
    ]
