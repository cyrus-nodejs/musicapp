
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Album
from ..serializers import AlbumSerializer









class AlbumViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


