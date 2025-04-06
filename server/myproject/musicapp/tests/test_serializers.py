
# Create your tests here.
from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Album, Artist, Genre, Track, Playlist, Pricing, Order, Subscription
from ..serializers import AlbumSerializer, ArtistSerializer, GenreSerializer, TrackSerializer, PlaylistSerializer, PricingSerializer, OrderSerializer, SubscriptionSerializer


















class MusicAppSerializerTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        self.genre = Genre.objects.create(title="Genre Title Test", cover_image='Genre Image Url')
        self.artist  = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Artist Image Url', followers=self.user)
        self.album =  album = Album.objects.create(title="Album TItle Test",  artist=self.artist,  release_date="2025-01-01", cover_image='Album Image Url')
        self.track = Track.objects.create(title="Track Title Test",  artist=self.artist, album=album, genre=self.genre, duration='240', likes='1', release_year="2023", cover_image='Track Image Url', audio_file='Track audio url', times_played='5', last_played='2025-05-21')
        self.playlist = Playlist.objects.create(title="Playlist Title Test",  user=self.user,  tracks=self.track, created_on='2025-01-01')
        self.playlist.tracks.add(self.track)
        self.pricing = Pricing.objects.create(plans="Pricing Plan Test",  price=100,  status='Pricing Status Test', duration=30, subscribers=self.user)
        self.order = Order.objects.create(owner=self.user,  pricing=self.pricing,  payment=True, paymentid='Order Paymentid Test', bill=100, order_date='2025-01-01')
        self.subscription = Subscription.objects.create(user=self.user,  pricing=self.pricing,  payment=True, start_date='2025-01-01', end_date='2025-01-31', status='Sub Status Test', bill=100, payment_status=True)
    
    def test_artist_serializer(self):
        serializer = ArtistSerializer(self.artist)
        self.assertEqual(serializer.data['name'], 'Artist Name Test')
        self.assertEqual(serializer.data['cover_image'], 'Artist Image Url')
        self.assertEqual(serializer.data['bio'], 'Artist Bio Test')
        self.assertEqual(serializer.data['followers']['first_name'], 'first_name')



        
    def test_genre_serializer(self):
        serializer = GenreSerializer(self.genre)
        self.assertEqual(serializer.data['title'], 'Genre Title Test')
        self.assertEqual(serializer.data['cover_image'], 'Genre Image Url')
        

    def test_album_serializer(self):
        serializer = AlbumSerializer(self.album)
        self.assertEqual(serializer.data['title'], 'Album TItle Test')
        self.assertEqual(serializer.data['artist']['name'], 'Artist Name Test')
        self.assertEqual(serializer.data['release_date'], 'Album Image Url')
        self.assertEqual(serializer.data['cover_image']['name'], '2025-01-01')

    
    def test_track_serializer(self):
        serializer = TrackSerializer(self.track)
        self.assertEqual(serializer.data['title'], 'Track Title Test')
        self.assertEqual(serializer.data['artist']['name'], 'Artist Name Test')
        self.assertEqual(serializer.data['genre']['title'], 'Genre Title Test')
        self.assertEqual(serializer.data['album']['title'], 'Album TItle Test')
        self.assertEqual(serializer.data['duration'], 'Track Duration')
        self.assertEqual(serializer.data['likes'], '1')
        self.assertEqual(serializer.data['release_year'], 'Track Release Year')
        self.assertEqual(serializer.data['cover_image'], 'Track Image Url')
        self.assertEqual(serializer.data['audio_file'], 'Track audio url')
        self.assertEqual(serializer.data['times_played'], '5')
        self.assertEqual(serializer.data['last_played'], '2025-05-21')


    
    def test_playlist_serializer(self):
        serializer = PlaylistSerializer(self.playlist)
        playlist = Playlist.objects.get(id=self.playlist.id)
        self.assertEqual(serializer.data['title'], 'Playlist Title Test')
        self.assertEqual(serializer.data['user']['first_name'], 'first_name')
        self.assertEqual(serializer.data['track'], 'Playlist Tracks')
        self.assertEqual(serializer.data['created_on'], '2025-01-01')
        self.assertEqual(serializer.data['tracks'].count(), 1)

    def test_pricing_serializer(self):
        serializer = PricingSerializer(self.pricing)
        self.assertEqual(serializer.data['plans'], 'Pricing Plan Test')
        self.assertEqual(serializer.data['price'], 100)
        self.assertEqual(serializer.data['status'], 'Pricing Status Test')
        self.assertEqual(serializer.data['duration'], 30)
        self.assertEqual(serializer.data['subscribers'].count(), 1)


    def test_order_serializer(self):
        serializer = OrderSerializer(self.order)
        self.assertEqual(serializer.data['owner']['first_name'], 'first_name')
        self.assertEqual(serializer.data['pricing']['price'], 100)
        self.assertEqual(serializer.data['payment'], True)
        self.assertEqual(serializer.data['paymentid'], 'Order Paymentid Test')
        self.assertEqual(serializer.data['bill'], 100)
        self.assertEqual(serializer.data['paymentid'], 'Order Paymentid Test')
        self.assertEqual(serializer.data['order_date'], '2025-01-01')
    

    def test_subscription_serializer(self):
        serializer = SubscriptionSerializer(self.subscription)
        self.assertEqual(serializer.data['user']['first_name'], 'first_name')
        self.assertEqual(serializer.data['pricing']['plans'], 'Sub Plans Test')
        self.assertEqual(serializer.data['payment'], True)
        self.assertEqual(serializer.data['start_date'], 'Sub Start Date Test')
        self.assertEqual(serializer.data['end_date'], '2025-01-01')
        self.assertEqual(serializer.data['status'], True)
        self.assertEqual(serializer.data['bill'], 100)
        self.assertEqual(serializer.data['payment_status'], 'Sub  Payment Status Test')





    
        
       


  