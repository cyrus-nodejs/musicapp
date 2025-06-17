
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Track
from ..serializers import TrackSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status

from rest_framework import status
from rest_framework.response import Response

from django.conf import settings

from django.db.models import F
from rest_framework.permissions import AllowAny

from django.utils import timezone







class TrackViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class AddTimesPlayedView(APIView):
    permission_classes = [AllowAny]
    def put(self, request, format=None):

        
        try:
            id = request.data.get('id')
            num_times = request.data.get('num_times')
            print(id)
            print(num_times)
            #Call the parent's update method to perform the actual update
            Track.objects.filter(id=id).update(times_played =F('times_played') + 1)
            Track.objects.filter(id=id).update(last_played =timezone.now())

      
    
            print("Updating book:")
            return Response({
                'message': 'Tracks clear from Playlist'
            })
        except Track.DoesNotExist:
            return Response({'error': str('no tracks found')}, status=status.HTTP_400_BAD_REQUEST)
        
 

#get latest song
class LatestSongView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
       
     query =request.data.get("searchQuery")
         
     tracks = Track.objects.filter(release_year='2023')
     # Serialize the queryset
     serializer = TrackSerializer(tracks, many=True)
    
    
     if tracks:
         # Return the serialized data as JSON
         return Response(serializer.data)
     else:
        return   Response({f"No results" })
    
#Most Played songs
class MostPlayedSongs(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
       
            tracks = Track.objects.all().order_by('-times_played')[:5]
            serializer = TrackSerializer(tracks, many=True)
            if tracks:
              return   Response(serializer.data)
            else:
               return   Response({f"No results" })

#Recently Played songs
class RecentlyPlayedSongs(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
       
           
         
            tracks = Track.objects.all().order_by('-last_played')[:5]
            serializer = TrackSerializer(tracks, many=True)
            if tracks:
              return   Response(serializer.data)
            else:
               return   Response({f"No results" })
    
