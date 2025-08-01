

from rest_framework.test import APITestCase,  APIClient
from rest_framework import status
from ..models import Genre, Artist, Album, Order, Track, Playlist, Pricing,  Subscription
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.urls import reverse


#Integration Test for Views (using DRF's APIClient):
class MusicAppAPITest(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()
       
          # Create some tracks
        self.genre = Genre.objects.create(title="Genre Title Test", cover_image='Genre Image Url')
        self.artist  = Artist.objects.create(name="Artist Name", bio="Artist Bio", cover_image='Artist Image Url', followers=self.user)
        self.album =   Album.objects.create(title="Album TItle Test",  artist=self.artist,  release_date="2025-01-01", cover_image='Album Image Url')
        self.track = Track.objects.create(title="Track Title Test",  artist=self.artist, album=self.album, genre=self.genre, duration=240, likes=1, release_year="2023", cover_image='Track Image Url', audio_file='Track Audio url', times_played=5 , last_played='2025-05-21')
        self.playlist = Playlist.objects.create(title="Playlist Title Test",  user=self.user,  created_on='2025-04-08T05:08:15.939487Z')
        
  
   
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
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
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
           # Authenticate with token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
   
        data = {
             "playlistId":self.playlist.id,
              "trackId": self.track.id,
        }

    
        response = self.client.put('/api/add-to-playlist/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
       
    
    
    def test_remove_from_playlist(self):
        # Authenticate the user

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        data = {
             "playlistId":self.playlist.id,
              "trackId": self.track.id,
        }
    
      
     
        response = self.client.put('/api/remove-from-playlist/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
       
        
    
    
    def test_delete_playlist(self):
         # Authenticate the user
   
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
      
        data = {
            "playlistId": self.playlist.id,
        }
        response = self.client.post('/api/delete-playlist/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
      
    

    # def test_create_order(self):
    #     # Authenticate the user
       
    #     self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        
    #      # Create new order
    #     data = {
    #         "bill": 100,
    #         "plan": 'premium'
    #     }
    #     response = self.client.post('/api/create-payment/', data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
 
    def test_current_playlist(self):
        # Authenticate the user
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        #Get current playlist
        url = f'/api/current-playlist/{self.playlist.id}/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Playlist Title Test')
        self.assertEqual(response.data['id'], self.playlist.id)
  
 
    

