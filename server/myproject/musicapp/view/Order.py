
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
import stripe
from ..models import Order, Pricing, Subscription
from ..serializers import OrderSerializer

import os
from rest_framework.permissions import IsAuthenticated

from datetime import  timedelta

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status



from rest_framework import status
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated


from rest_framework.permissions import AllowAny

from datetime import timedelta
from django.utils import timezone

from django.conf import settings

STRIPE_SECRET_KEY =  os.getenv('STRIPE_SECRET')








class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


    
# retrieve cuurent order
class CurrentOrderView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        current_order = Order.objects.latest('order_date')
        order_serializer = OrderSerializer(current_order)
        return Response(order_serializer.data, status=status.HTTP_200_OK)

      




#Create payment Intent with Strip Api
class CreatePaymentIntentView(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request, format=None): 
        try:
            bills= request.data.get("bill")
            plan= request.data.get("plan")
            # Create a PaymentIntent
            payment_intent = stripe.PaymentIntent.create(
                amount=bills * 100,  # Example amount in cents
                currency="usd",
            )
            pricing = Pricing.objects.get(plans=plan)
            print(pricing)
            NewOrder = Order.objects.create(owner=request.user, bill=bills, paymentid=payment_intent.id, payment=False, pricing=pricing) 
            return Response({
                'client_secret': payment_intent.client_secret
            })
        except stripe.error.CardError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
#Validate Card Payment
class ConfirmPaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
            paymentintent =request.data.get("paymentIntent")
            print(paymentintent)
            if paymentintent['status'] == 'succeeded':
                subexists = Subscription.objects.filter(paymentid=paymentintent['id']) 
                if subexists:
                     return  Response({'message': 'Payment already Validated!'})
                else:
                     order = Order.objects.get(paymentid=paymentintent['id']) 
                     print(order)
                     sub= Subscription.objects.create(user=request.user, pricing=order.pricing, paymentid=order.paymentid, payment=order.payment, end_date=timezone.now().date() + timedelta(days=30), bill=order.bill,  payment_status='paid') 
                     order.payment = True
                     order.save()
                     return Response({'message': 'payment completed!'})
            else:
                 return  Response({'message': paymentintent['status']})

        
            
        

#Recover payment
class RecoverPaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            # Create a PaymentIntent
            orderId =request.data.get("orderId")
            order = Order.objects.get(id=orderId)
            paymentid= order.paymentid

            if order:
                paymentintent = stripe.PaymentIntent.retrieve(paymentid)
                if paymentintent:
                      return  Response({'message': f"status:{paymentintent.status}, status:${paymentintent.amount}"})
                else:
                     return  Response({'message': 'payment failed!'})
            else:
                return  Response({'message': 'No orders yet!'})
        except paymentintent.status as e:
            return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)




