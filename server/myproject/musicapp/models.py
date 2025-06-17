from django.db import models

# Create your models here.

from datetime import timezone
from django.db import models
import uuid
from django.db import models
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.

class Artist(models.Model):
    name =  models.CharField(max_length=100)
    cover_image =  CloudinaryField('image', blank=True, null=True )  # Cloudinary image field
    bio = models.CharField(max_length=100)
    followers = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

     # Method to return Cloudinary URL for image
    def save(self, *args, **kwargs):
        if self.cover_image:
            # Get the Cloudinary URL for the image
            self.image_url = self.cover_image
        super().save(*args, **kwargs)

    
    def __str__(self):
        return f"Artist: {self.name if self.cover_image else 'No Image'}"
    


 

class Album(models.Model):

    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, related_name='album_artist', on_delete=models.CASCADE)
    release_date = models.CharField(max_length=100)
    cover_image =  CloudinaryField('image', blank=True, null=True)


     # Method to return Cloudinary URL for image
    def save(self, *args, **kwargs):
        if self.cover_image:
            # Get the Cloudinary URL for the image
            self.image_url = self.cover_image
       
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Album: {self.title if self.cover_image else 'No Image'}"
    


    

class Genre(models.Model):
  
    title = models.CharField(max_length=100)
    cover_image =  CloudinaryField('image', blank=True, null=True)


     # Method to return Cloudinary URL for image
    def save(self, *args, **kwargs):
        if self.cover_image:
            # Get the Cloudinary URL for the image
            self.image_url = self.cover_image
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Genre: {self.title if self.cover_image else 'No Image'}"
    




class Track(models.Model):
  
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, related_name='track_artists', on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, related_name='track_genres', on_delete=models.CASCADE)
    album = models.ForeignKey(Album, related_name='track_album', on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now=True)
    likes= models.IntegerField(default=0) 
    duration=  models.IntegerField()
    release_year = models.CharField(max_length=100)
    cover_image =  CloudinaryField('image', blank=True, null=True)  # For image uploads
    audio_file = CloudinaryField('audio', resource_type='video', null=True) # For audio uploads
    times_played=models.IntegerField(default=0) 
    last_played=models.DateField( null=True)

     # Method to return Cloudinary URL for image
    def save(self, *args, **kwargs):
        if self.cover_image:
            # Get the Cloudinary URL for the image
            self.image_url = self.cover_image
        if self.audio_file:
            # Get the Cloudinary URL for the audio file
            self.audio_url = self.audio_file
        super().save(*args, **kwargs)

    
    def __str__(self):
       return f"Track: {self.title if self.cover_image else 'No Image'}, Audio: {self.audio_file if self.audio_file else 'No Audio'}"
    
   





class Playlist(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, unique=True)
    tracks = models.ManyToManyField(Track)
    created_on=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title



class Played(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tracks = models.ManyToManyField(Track)
  



class Pricing(models.Model):

    plans = models.CharField(max_length=10, choices=[('basic', 'Basic'), ('medium', 'Medium'), ('premium', 'Premium')],)
    price = models.IntegerField() 
    duration= models.IntegerField(default=30) 
    status = models.CharField(max_length=10, choices=[('active', 'Active'), ('paused', 'Paused'), ('cancelled', 'Cancelled')], default='active')
    subscribers= models.ForeignKey(User, on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.plans

 
 




class Order(models.Model):
  
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    pricing = models.ForeignKey(Pricing, related_name='pricing_order', on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    payment =  models.BooleanField(default=False)
    paymentid = models.CharField(max_length=100)
    bill = models.IntegerField()
    order_date = models.DateTimeField(auto_now=True)
   
    def __str__(self):
        return self.pricing.plans



class Subscription(models.Model):
 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_subscriptions')
    pricing = models.ForeignKey(Pricing, related_name='pricing_subscription', on_delete=models.CASCADE)
    paymentid = models.CharField(max_length=100, null=True)
    payment =  models.BooleanField(default=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True)
    status = models.CharField(max_length=10, choices=[('active', 'Active'), ('paused', 'Paused'), ('cancelled', 'Cancelled')], default='active')
    bill =  models.IntegerField()
    payment_status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('paid', 'Paid'), ('failed', 'Failed')], default='paid')
    

    def __str__(self):
        return f"{self.user.username} - {self.pricing} Subscription"

    def is_active(self):
        """Check if the subscription is currently active"""
        return self.status == 'active' and self.end_date > timezone.now()

    def renew_subscription(self):
        """Renew subscription for another month"""
        self.end_date = self.end_date.replace(month=self.end_date.month + 1)
        self.save()






    
