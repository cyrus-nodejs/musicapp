# Create your tests here.
from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Album, Artist, Genre, Track, Playlist, Pricing, Order, Subscription


#Unit Test
class MusicAppTestCase(TestCase):
    def test_create_artist(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        artist = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Artist Image Url', followers=user)
        self.assertEqual(artist.name, "Artist Name")
        self.assertEqual(artist.bio, "Artist Bio")
        self.assertEqual(artist.cover_image, "Artist Image Url")
        self.assertEqual(artist.followers.first_name, 'first_name')

    def test_create_album(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        artist = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Album Image Url', followers=user)
        album = Album.objects.create(title="Album Title",  artist=artist,  release_date="2025-01-01", cover_image='Album Image Url')
        self.assertEqual(album.title, "Album Title")
        self.assertEqual(album.artist.name, "Artist Name")
        self.assertEqual(album.cover_image, "Album Image Url")
        self.assertEqual(album.release_date, "2025-01-01")

    def test_create_genre(self):
        genre = Genre.objects.create(title="Genre Title", cover_image='Genre Image Url')
        self.assertEqual(genre.title, "Genre Title")
        self.assertEqual(genre.cover_image, "Genre Image Url")
    
    
    def test_create_track(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        artist = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Album Image Url', followers=user)
        album = Album.objects.create(title="Album Title",  artist=artist,  release_date="2025-01-01", cover_image='Artist Image Url')
        genre = Genre.objects.create(title="Genre Title",   cover_image='Genre Image Url')
        track = Track.objects.create(title="Track  Title Test",  artist=artist, album=album, genre=genre, duration='Track Duration', likes='1', release_year="Track Release Year", cover_image='Track Image Url', audio_file='Track audio url', times_played='5', last_played='2025-05-21')
        self.assertEqual(track.title, "Track Title Test")
        self.assertEqual(track.artist.name, "Artist Name")
        self.assertEqual(track.album.title, "Album Title")
        self.assertEqual(track.genre.title, "Genre Title")
        self.assertEqual(track.cover_image, "Track Image Url")
        self.assertEqual(track.duration, "Track Duration")
        self.assertEqual(track.release_year, "Track Release Year")
        self.assertEqual(track.likes, "1")
        self.assertEqual(track.cover_image, "Track Image Url")
        self.assertEqual(track.audio_file, "Track audio url")
        self.assertEqual(track.times_played, "5")
        self.assertEqual(track.last_played, "2025-05-21")
        
    

    def test_create_playlist(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        artist = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Album Image Url', followers='Artist Followers')
        album = Album.objects.create(title="Album Title",  artist=artist,  release_date="2025-01-01", cover_image='Artist Image Url')
        genre = Genre.objects.create(title="Genre Title",   cover_image='Genre Image Url')
        track = Track.objects.create(title="Track Title Test",  artist=artist, album=album, genre=genre, duration='30', likes='1', release_year="2023", cover_image='Track Image Url', audio_file='Track audio url', times_played='5', last_played='2025')
        playlist = Playlist.objects.create(title="Test Playlist",  user=user,  tracks=track, created_on='2025-01-01')
        self.assertEqual(playlist.title, "Playlist Title")
        self.assertEqual(playlist.user.first_name, "first_name")
        self.assertEqual(playlist.tracks, "Playlist Track")
        self.assertEqual(playlist.created_on, "2025-01-01")
                             
     
    def test_create_pricing(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        pricing = Pricing.objects.create(plans="Pricing Plan Test",  price=100,  status='Pricing Status Test', duration=30, subscribers=user)
        self.assertEqual(pricing.plans, "Pricing Plan Test")
        self.assertEqual(pricing.price, 100)
        self.assertEqual(pricing.status, "Pricing Status Test")
        self.assertEqual(pricing.duration, 30)
        self.assertEqual(pricing.subscribers, 'first_name')




    def test_create_order(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        pricing = Pricing.objects.create(plans="Pricing Plan Test",  price='Pricing Test',  status='Pricing Status Test', duration=30, subscribers=user)
        order = Order.objects.create(owner=user,  pricing=pricing,  payment=True, paymentid='Order Paymentid Test', bill=100, order_date='2025-01-01')
        self.assertEqual(order.owner.first_name, "first_name")
        self.assertEqual(order.pricing.price, "Order Price Test")
        self.assertEqual(order.payment, True)
        self.assertEqual(order.paymentid, "Order Paymentid Test")
        self.assertEqual(order.bill, 100)
        self.assertEqual(order.order_date, "2025-01-01")
        

    
    def test_create_subscription(self):
        user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        pricing = Pricing.objects.create(plans="Pricing Plan Test",  price='Pricing Test',  status='Pricing Status Test', duration=30, subscribers=user)
        subscription = Subscription.objects.create(user=user,  pricing=pricing,  payment=True, start_date='2025-01-01', end_date='2025-01-31', status='Active', bill=100, payment_status=True)
        self.assertEqual(subscription.user.first_name, "first_name")
        self.assertEqual(subscription.pricing.price, "Sub Plans Test")
        self.assertEqual(subscription.payment, True)
        self.assertEqual(subscription.start_date, "2025-01-01")
        self.assertEqual(subscription.end_date, "2025-01-31")
        self.assertEqual(subscription.status, "Active")
        self.assertEqual(subscription.bill, 100)
        self.assertEqual(subscription.payment_status, True)




