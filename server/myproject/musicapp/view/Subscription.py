
from rest_framework import viewsets

from ..models import Subscription
from ..serializers import SubscriptionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response











class SubscriptionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer


# update playlist title
class CurrentSubView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        current_sub = Subscription.objects.latest('start_date')
        currentsub_serializer = SubscriptionSerializer(current_sub)
        return Response(currentsub_serializer.data, status=status.HTTP_200_OK)
    

  