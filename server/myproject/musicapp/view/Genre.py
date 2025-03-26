
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Genre
from ..serializers import GenreSerializer









class GenreViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset =Genre.objects.all()
    serializer_class = GenreSerializer


