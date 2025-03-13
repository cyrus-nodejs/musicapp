from rest_framework import decorators
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import AnonymousUser
from datetime import  timedelta
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from .models import Track, Album, Artist, Genre, Playlist, Played, Order, Pricing, Subscription
from .serializers import  UserSerializer,   AlbumSerializer, ArtistSerializer, PlayedSerializer, PlaylistSerializer, SubscriptionSerializer, TrackSerializer, GenreSerializer,OrderSerializer, PricingSerializer
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from .utils import encode_jwt
from django.db.models import F
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import timedelta
from django.utils import timezone
from django.db.models import Q
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
import stripe
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.shortcuts import render
from datetime import date
from django.contrib.auth.hashers import check_password


stripe.api_key = settings.STRIPE_SECRET_KEY
import logging

logger = logging.getLogger(__name__)

logger.debug(f'Stripe API Key: {stripe.api_key}')

# import secrets
# secret_key = secrets.token_bytes(32)  # You can adjust the length
# print(secret_key)


def Index(request):
    return render(request, 'base.html')

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class CustomLoginView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        

        
        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user':str(user),
                'message':"Login Successfull!"
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
     
class LogoutView(APIView):
     permission_classes = [AllowAny]
    
     def post(self, request, *args, **kwargs):
         response = JsonResponse({'message': 'Successfully logged out'})
         response.delete_cookie('jwt_token', path='/')  # Deletes the cookie
         return response


   
class AuthUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Access the authenticated user
        user =   str(request.user)
         # Get the authenticated user
        user = request.user
        # You can return any fields from the User model or related models
        user_data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'is_active': user.is_active,
            'date_joined': user.date_joined,
        }
        print(user_data)
        # Now you can return user details
        if isinstance(user, AnonymousUser):
           return Response({'message': 'Anonymous User'}, status=200)
        return JsonResponse(user_data, status=status.HTTP_200_OK)
    
class PasswordResetRequestView(APIView):
  
    permission_classes = [AllowAny]

    def post(self, request):
     
            try:
                user = User.objects.get(email=request.data.get('email'))
                uid = urlsafe_base64_encode(str(user.pk).encode())
                token = default_token_generator.make_token(user)
                
                reset_link = f'http://localhost:5173/reset-password/?token={token}&uid={uid}'

                subject = "Password Reset Request"
                message = render_to_string('password_reset_email.html', {
                    'user': user,
                    'reset_link': reset_link,
                })
                send_mail(subject, message, 'from@example.com', [request.data.get('email')])

                return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)

#Confirm Reset and update  Password
class PasswordResetConfirmView(APIView):
   

    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            new_password = serializer.validated_data['password']
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password successfully reset."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer




class AlbumViewSet(viewsets.ModelViewSet):
     
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer



class GenreViewSet(viewsets.ModelViewSet):
     

    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

   
    
class AddTimesPlayedView(APIView):
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
        except stripe.error.CardError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
 
       
    
class PlaylistViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Playlist.objects.all()
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
           track = Track.objects.filter(id=trackId)
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
        
 

 

      
class PlayedViewSet(viewsets.ModelViewSet):
      permission_classes = [IsAuthenticated]
      queryset = Played.objects.all()
      serializer_class = PlayedSerializer


      def create(self, request, *args, **kwargs):
        sub= Played.objects.create(user=request.user, tracks=request.data.get('trackId')) 
        sub.save() 
        # Custom logic before calling the default partial_update method
        return super().create(request, *args, **kwargs)

    



class PricingViewSet(viewsets.ModelViewSet):
       
      queryset = Pricing.objects.all()
      serializer_class = PricingSerializer
  


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    




class SubcriptionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer


#get latest song
class LatestSongView(APIView):

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

    def get(self, request, *args, **kwargs):
       
            tracks = Track.objects.all().order_by('-times_played')[:20]
            serializer = TrackSerializer(tracks, many=True)
            if tracks:
              return   Response(serializer.data)
            else:
               return   Response({f"No results" })

#Recently Played songs
class RecentlyPlayedSongs(APIView):

    def get(self, request, *args, **kwargs):
       
           
         
            tracks = Track.objects.all().order_by('-last_played')[:5]
            serializer = TrackSerializer(tracks, many=True)
            if tracks:
              return   Response(serializer.data)
            else:
               return   Response({f"No results" })
    




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
           
            NewOrder = Order.objects.create(owner=request.user, bill=bills, paymentid=payment_intent.id, payment=False, plans=plan) 
            return Response({
                'client_secret': payment_intent.client_secret
            })
        except stripe.error.CardError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
#Validate Card Payment
class ConfirmPaymentIntentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            paymentintent =request.data.get("paymentIntent")
            if paymentintent.status == 'succeeded':
                subexists = Subscription.objects.get(paymentid=paymentintent.id) 
                if subexists:
                     return  Response({
                'message': 'Payment already Validated!'
            })
            else:
                order = Order.objects.get(paymentid=paymentintent.id) 
                sub= Subscription.objects.create(user=request.user, plans=order.plans, payment=order.payment, end_date=timezone.now().date() + timedelta(days=30), bill=order.bill, payment_status=['paid']) 
                updateOrder = Order.objects.filter(paymentid=paymentintent.id).update(payment=True) 
                updateOrder.save()
                return Response({'message': 'payment completed!'})
        except paymentintent.status as e:
            return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

#Recover payment
class RecoverPaymentIntentView(APIView):
    authentication_classes = [JWTAuthentication]
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


#search queay Api
class SearchQueryView(APIView):

    def post(self, request, *args, **kwargs):
       
            query =request.data.get("searchQuery")
         
            result = Track.objects.filter(
            Q(title__icontains=query) | Q(artist__icontains=query) | Q(album__icontains=query) | Q(
            genre__icontains=query) | Q(duration__icontains=query ) | Q(date_added__icontains=query ) | Q(likes__icontains=query ) | Q(cover_image__icontains=query ) | Q(audio_file__icontains=query )
            )
            if result:
              return   Response({f"result:   {result}" })
            else:
               return   Response({f"No results" })
    



