from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Track, Artist, Album, Genre, Playlist, Pricing, Played, Order, Subscription, User
from django.contrib.auth.models import AnonymousUser


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

        def to_representation(self, instance):
            # Handle AnonymousUser case
            if isinstance(instance, AnonymousUser):
               return {'username': 'Anonymous', 'is_authenticated': False}
            return super().to_representation(instance)

        def create(self, validated_data):
           user = User.create_user(
               username=validated_data['username'],
               email=validated_data['email'],
               first_name=validated_data['first_name'],
               last_name=validated_data['last_name'] ,
               password=validated_data['password']
           )

           return user
        

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        # Add user info to the response
        data['username'] = user.username
        data['email'] = user.email
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        return data
         
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    
  
class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['id', 'title', 'cover_image', ]

 


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'cover_image',  'bio', 'followers']
 

   

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()
    class Meta:
        model = Album
        fields = ['id', 'title', 'artist', 'release_date','cover_image']



class TrackSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()
    genre = GenreSerializer()
    album = AlbumSerializer()

    class Meta:
        model = Track
        fields = ['id', 'title', 'artist', 'genre','album', 'duration', 'date_added', 'likes',  'release_year','cover_image','audio_file','times_played', 'last_played']



class PricingSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Pricing
        fields = ['id', 'plans', 'price',  'duration', 'subscribers']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Playlist
        # fields = '__all__'
        fields = ['id', 'title', 'user', 'tracks','created_on']

 


class PlayedSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Played
        fields = ['id', 'user', 'tracks' ]





class OrderSerializer(serializers.ModelSerializer):


    class Meta:
        model = Order
        fields = ['id', 'owner', 'plans', 'payment', 'paymentid', 'bill', 'order_date']






class SubscriptionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plans', 'payment', 'start_date', 'end_date', 'status', 'bill', 'payment_status']