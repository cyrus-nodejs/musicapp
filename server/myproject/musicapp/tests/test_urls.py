

from rest_framework.test import APITestCase
from rest_framework import status
from ..models import Genre, Artist, Album, Order, Track, Playlist, Pricing,  Subscription
from django.contrib.auth.models import User




#Integration Test for Views (using DRF's APIClient):
class MusicAppAPITest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
          # Create some tracks
        self.genre = Genre.objects.create(title="Genre Title Test", cover_image='Genre Image Url')
        self.artist  = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Artist Image Url', followers=self.user)
        self.album =   Album.objects.create(title="Album TItle Test",  artist=self.artist,  release_date="2025-01-01", cover_image='Album Image Url')
        self.track1 = Track.objects.create(title="Track Title Test",  artist=self.artist, album=self.album, genre=self.genre, duration=240, likes=1, release_year="2023", cover_image='Track Image Url', audio_file='Track Audio url', times_played=5 , last_played='2025-05-21')
        # self.track = Track.objects.create(title="Track 1", artist="Artist 1", duration=180)
  
   
    def test_get_artist(self):
        response = self.client.get('/api/artists/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    
    def test_get_album(self):
        response = self.client.get('/api/albums/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
   
    
    def test_get_genre(self):
        response = self.client.get('/api/genres/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
     

    # def test_get_track(self):
    #     response = self.client.get('/api/tracks/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data[0]['title'], 'Track Title Test')

    def test_get_playlist(self):
        response = self.client.get('/api/playlist/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
     


    def test_create_playlist(self):
        # Authenticate the user
        
        self.client.login(username='testuser', password='password')
        playlist_data = {
            "title": 'My Playlist',
        }
        #Create new Playlist
        response = self.client.post('/api/create-playlist/', playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'My Playlist')
        # playlist_id = response.data['id']
    
    def test_add_to_playlist(self):
         # Authenticate the user

        self.client.login(username='testuser', password='password')
        playlist_data = {
            "title": 'My Playlist',
        }
        #Create new Playlist
        response = self.client.post('/api/create-playlist/', playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], "My Playlist")
        playlist_id = response.data['id']

        # Add track to playlist
        add_to_playlist_data = {
            "playlistId": playlist_id,
              "trackId": self.track1,
        }
        response = self.client.put('/api/add-to-playlist/', add_to_playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
       
    
    
    def test_remove_from_playlist(self):
        # Authenticate the user

        self.client.login(username='testuser', password='password')
        playlist_data = {
            "title": 'My Playlist',
        }
        #Create new Playlist
        response = self.client.post('/api/create-playlist/', playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], "My Playlist")
        playlist_id = response.data['id']


        #Remove track from playlist
        remove_playlist_data = {
            "playlistId": playlist_id,
              "trackId": self.track1,
        }
        response = self.client.put('/api/remove-from-playlist/', remove_playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
       
        
    
    
    def test_delete_playlist(self):
         # Authenticate the user
   
        self.client.login(username='testuser', password='password')
        playlist_data = {
            "title": 'My Playlist',
        }
        #Create new Playlist
        response = self.client.post('/api/create-playlist/', playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], "My Playlist")
        playlist_id = response.data['id']

        delete_playlist_data = {
            "playlistId": playlist_id,
        }
        response = self.client.post('/api/delete-playlist/', delete_playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['id'], self.playlist.id,)
    

    def test_create_order(self):
        # Authenticate the user
       
        self.client.login(username='testuser', password='password')
        
         # Create new order
        order_data = {
            "bill": 100,
            "plan": 'premium'
        }
        response = self.client.post('/api/orders/', order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        order_id = response.data['id']
 
    def test_current_playlist(self):
        # Authenticate the user
        
        self.client.login(username='testuser', password='password')

        # Create a playlist
        playlist_data = {
            "title": 'My Playlist',
        }
        response = self.client.post('/api/create-playlist/', playlist_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], "My Playlist")
        playlist_id = response.data['id']
         
        #Get current playlist
        response = self.client.get(f'/api/current-playlist/{playlist_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Playlist Title Test')
 
    
    def test_current_order(self):
        # Authenticate the user
  
        self.client.login(username='testuser', password='password')

         # Create new order
        order_data = {
            "bill": 100,
            "plan": 'premium'
        }
        response = self.client.post('/api/orders/', order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        order_id = response.data['id']

         # Get current Order
        response = self.client.get(f'/api/current-order/{order_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['bill'], 100)
     

    # def test_current_subscription(self):
    #     self.client.login(username='testuser', password='password')
    #     response = self.client.get(f'/api/current-sub/{self.subscription.id}/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['pricing']['plans'], 'Pricing Plan Test')
    #     self.assertEqual(response.data['start_date'], '2025-01-01')