
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from ..models import Track 
from ..serializers import   TrackFilter, TrackSerializer


from django_filters.rest_framework import DjangoFilterBackend







class SearchQueryView(APIView):

    
     def get(self, request, *args, **kwargs):
        # Get the search query parameter (e.g., 'search=rock')
        search_query = request.query_params.get('search', None)
        
        # If search query is provided, filter the MusicTrack objects
        if search_query:
            # Search in the fields like title, artist, album, and genre using Q objects for OR search
            tracks = Track.objects.filter(
                Q(title__icontains=search_query) | 
                Q(artist__name__icontains=search_query) |
                Q(album__title__icontains=search_query) |
                Q(genre__title__icontains=search_query) |
                Q(release_year__icontains=search_query) 

            )
        else:
            # If no search query, just return all music tracks
            tracks = Track.objects.all()
        
        # Serialize the data
        serializer = TrackSerializer(tracks, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)