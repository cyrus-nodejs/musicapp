

from rest_framework.test import APITestCase
from rest_framework import status
from ..models import Genre, Artist, Album, Order, Track, Playlist, Pricing,  Subscription
from django.contrib.auth.models import User




#Integration Test for Views (using DRF's APIClient):
class MusicAppAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='username', password='password')
        self.client.login(username='username', password='password')
        self.user = User.objects.create(username="username", password='password', first_name="first_name", last_name='last_name' )
        self.genre = Genre.objects.create(title="Genre Title Test", cover_image='Genre Image Url')
        self.artist = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Album Image Url', followers=self.user)
        self.album =  album = Album.objects.create(title="Album Title Test",  artist=self.artist,  release_date="2025-01-01", cover_image='Album Image Url')
        self.track = Track.objects.create(title="Track Title Test",  artist=self.artist, album=album, genre=self.genre, duration='240', likes='1', release_year="2023", cover_image='Track Image Url', audio_file='Track audio url', times_played='5', last_played='2025-05-21')
        self.playlist = Playlist.objects.create(title="Playlist Title Test",  user=self.user,   created_on='2025-01-01')
        # self.playlist.tracks.add(self.track)
        self.pricing = Pricing.objects.create(plans="Pricing Plan Test",  price=100,  status='Pricing Status Test', duration=30, subscribers=self.user)
        self.order = Order.objects.create(owner=self.user,  pricing=self.pricing,  payment=True, paymentid='Order Paymentid Test', bill=100, order_date='Order Date Test')
        self.subscription = Subscription.objects.create(user=self.user,  pricing=self.pricing,  payment=True, start_date='2025-01-01', end_date='2025-01-31', status='Sub Status Test', bill=100, payment_status=True)
       
    def test_get_artist(self):
        response = self.client.get('/api/artists/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Artist Name')
    
    def test_get_album(self):
        response = self.client.get('/api/albums/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], 'Album Title Test')
    
    def test_get_genre(self):
        response = self.client.get('/api/genres/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], 'Genre Title Test')

    # def test_get_track(self):
    #     response = self.client.get('/api/tracks/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data[0]['title'], 'Track Title Test')

    def test_get_playlist(self):
        response = self.client.get('/api/playlist/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Playlist Title Test')


    def test_create_playlist(self):
        playlist_data = {
            "title": self.playlist.title,
        }
        response = self.client.post('/api/create-playlist/', playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], self.playlist.title)
    
    # def test_add_to_playlist(self):
    #     playlist_data = {
    #         "playlistId": self.playlist.id,
    #           "trackId": self.playlist.tracks.id,
    #     }
    #     response = self.client.put('/api/add-to-playlist/', playlist_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(response.data['id'], self.playlist.id)
    #     self.assertEqual(response.data['tracks']['id'], self.playlist.tracks.id)
    
    
    # def test_remove_from_playlist(self):
    #     playlist_data = {
    #         "playlistId": self.playlist.id,
    #           "trackId": self.playlist.tracks.id,
    #     }
    #     response = self.client.put('/api/remove-from-playlist/', playlist_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(response.data['id'], self.playlist.id)
        
    
    
    # def test_delete_playlist(self):
    #     playlist_data = {
    #         "playlistId": self.playlist.id,
    #     }
    #     response = self.client.post('/api/delete-playlist/', playlist_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(response.data['id'], self.playlist.id,)
    

    def test_create_order(self):
        order_data = {
            "bill": self.order.bill,
            "plan": self.order.pricing.plans
        }
        response = self.client.post('/api/orders/', order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['bill'], self.order.bill)
 
    def test_current_playlist(self):
        response = self.client.get(f'/api/current-playlist/{self.playlist.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Playlist Title Test')
 
    
    def test_current_order(self):
        response = self.client.get(f'/api/current-order/{self.order.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bill'], 'Order Bill Test')
        self.assertEqual(response.data['owner']['first_name'], 'Order User Test')

    def test_current_subscription(self):
        response = self.client.get(f'/api/current-sub/{self.subscription.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['pricing']['plans'], 'Sub Plans test')
        self.assertEqual(response.data['start_date'], 'Sub Start Date Test')