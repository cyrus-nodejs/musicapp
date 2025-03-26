from django.contrib import admin
from django.contrib.admin.models import LogEntry
from django.conf import settings
# Register your models here.
from django.contrib import admin

# Register your models here.

from django.contrib import admin

from .models import Album, Artist, Track, Genre, Pricing, Playlist, Order, Subscription

# @admin.register(Artist)
# class ArtistAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'bio', 'cover_image', 'image_url', 'followers')
# Make sure LogEntry is correctly using the custom user model

admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Genre)
admin.site.register(Track)
admin.site.register(Pricing)
admin.site.register(Playlist)
admin.site.register(Order)
admin.site.register(Subscription)


