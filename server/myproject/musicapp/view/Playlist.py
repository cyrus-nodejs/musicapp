
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Playlist, Track
from ..serializers import PlaylistSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication










class PlaylistViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset =Playlist.objects.all()
    serializer_class = PlaylistSerializer


# update playlist title
class CreatePlaylistView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):

        title = request.data.get('title')
   
        user = request.user
        print(title)
        print(user)

        playlist = Playlist.objects.create(title=title, user=user)
        playlist_serializer = PlaylistSerializer(playlist)
        return Response(playlist_serializer.data, status=status.HTTP_201_CREATED)
    
# update playlist title
class CurrentPlaylistView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id, format=None):
        print(id)
        playlist = Playlist.objects.get(id=id)
        playlist_serializer = PlaylistSerializer(playlist)
        return Response(playlist_serializer.data, status=status.HTTP_200_OK)

      

      
# update playlist title
class UpdatePlaylistTitleView(APIView):

    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        
        try:
        
           title= request.data.get("title")
           playlistId =request.data.get("playlistId")
           playlist = Playlist.objects.get(id=playlistId)
           playlist.title=title
           playlist.save()
           return Response({
                'message': f'{playlist}  title updated'
            })
        except playlist.error as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Add track from playlist
class AddtoPlaylistView(APIView):

    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        {f"No results" }
        try:
           trackId= request.data.get("trackId")
           playlistId =request.data.get("playlistId")
           print(trackId, playlistId)
           playlist = Playlist.objects.get(id=playlistId)
           track = Track.objects.get(id=trackId)
           playlist.tracks.add(track)
           return Response({'message': f'{track.title}  added to {playlist.title}'}, status=status.HTTP_200_OK)
        except Playlist.DoesNotExist:
            return Response({'error': 'Playlist not found'}, status=status.HTTP_400_BAD_REQUEST)

# Remove track from playlist
class RemoveFromPlaylistView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        
        try:
           trackId, playlistId
           trackId= request.data.get("trackId")
           playlistId =request.data.get("playlistId")
           playlist = Playlist.objects.get(id=playlistId)
           track = Track.objects.get(id=trackId)
           playlist.tracks.remove(track)
           return Response({
                'message': 'track remove from playlist'
            })
        except playlist.error as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#Clear all tracks from Playlist
class ClearPlaylistView(APIView):
 
    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        
        try:
        

           playlistId =request.data.get("playlistId")
           playlist = Playlist.objects.get(id=playlistId)
           playlist.tracks.clear()
           return Response({'message': f'Tracks clear from {playlist.title}' })
        except playlist.error as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class DeletePlaylistView(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        try:
           playlistId =request.data.get("playlistId")
           playlist = Playlist.objects.get(id=playlistId)
           playlist.delete()
           return Response({
                'message': f'{playlist.title} delete from database'
            })
        except Playlist.DoesNotExist:
            return Response({'error': 'Not FOund'}, status=status.HTTP_400_BAD_REQUEST)
        
 

 
