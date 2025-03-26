
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Pricing
from ..serializers import PricingSerializer









class PricingViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Pricing.objects.all()
    serializer_class = PricingSerializer


