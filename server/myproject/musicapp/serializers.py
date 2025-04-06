from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Track, Artist, Album, Genre, Playlist, Pricing, Played, Order, Subscription
from django.contrib.auth.models import User
from django.contrib.auth.models import AnonymousUser
import django_filters
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash the password before saving the user
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email', ''),
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



class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'cover_image',  'bio', 'followers']
 
class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['id', 'title', 'cover_image', ]
   

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

class TrackFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains', label='Title')
    artist = django_filters.CharFilter(lookup_expr='icontains', label='Artist')
    album = django_filters.CharFilter(lookup_expr='icontains', label='Album')
    release_year = django_filters.DateFilter(lookup_expr='exact', label='Release Year')
    genre = django_filters.CharFilter(lookup_expr='icontains', label='Genre')



    class Meta:
        model = Track
        fields = ['title', 'artist', 'album', 'genre', 'release_year']

class PricingSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Pricing
        fields = ['id', 'plans', 'price', 'status', 'duration', 'subscribers']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Playlist
        fields = ['id', 'title', 'user', 'tracks','created_on']

 


class PlayedSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Played
        fields = ['id', 'user', 'tracks' ]





class OrderSerializer(serializers.ModelSerializer):
     pricing = PricingSerializer()
     owner = UserSerializer()
     class Meta:
        model = Order
        fields = ['id', 'owner', 'pricing', 'payment', 'paymentid', 'bill', 'order_date']






class SubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    pricing = PricingSerializer()
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'pricing', 'payment', 'start_date', 'end_date', 'status', 'bill', 'payment_status']



