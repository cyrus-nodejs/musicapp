# Generated by Django 5.1.6 on 2025-03-10 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0003_playlist_created_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlist',
            name='title',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
