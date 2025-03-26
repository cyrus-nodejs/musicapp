# from rest_framework import decorators
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import AnonymousUser
# from datetime import  timedelta
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework import viewsets
# from rest_framework.views import APIView
# from rest_framework import status

# from django.contrib.auth import get_user_model
# from django.contrib.auth.forms import PasswordResetForm
# from django.contrib.auth.views import PasswordResetView
# from django.contrib.auth.models import User
# from django.http import JsonResponse
# from django.contrib.sites.shortcuts import get_current_site

# from rest_framework import status
# from rest_framework.response import Response
# from .models import Track, Album, Artist, Genre, Playlist, Played, Order, Pricing, Subscription
# from .serializers import  UserSerializer, TrackFilter,    AlbumSerializer, ArtistSerializer, PlayedSerializer, PlaylistSerializer, SubscriptionSerializer, TrackSerializer, GenreSerializer,OrderSerializer, PricingSerializer
# from django.conf import settings
# from rest_framework.permissions import IsAuthenticated

# from django.contrib.auth.views import PasswordResetView
# from django.db.models import F
# from rest_framework.permissions import AllowAny
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from datetime import timedelta
# from django.utils import timezone
# from django.db.models import Q
# from django.contrib.auth.tokens import default_token_generator
# from django.core.mail import send_mail
# import stripe
# from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
# from django.template.loader import render_to_string
# from django.shortcuts import render
# from datetime import date
# from django.contrib.auth.hashers import check_password
# import stripe

# stripe.api_key= 'sk_test_51Mps4OAtt6kY2KD51CdVhQGStXPjCKcoOqaD2bA44AAbnoTPpLN3wlT2FfPLSy02mEVbFvjTKMWWBOehzsX7Nurg00mcQy0C6X'


# # import secrets
# # secret_key = secrets.token_bytes(32)  # You can adjust the length
# # print(secret_key)


# def Index(request):
#     return render(request, 'base.html')

# class RegisterUserView(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request, *args, **kwargs):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

     
# class LogoutView(APIView):
#      permission_classes = [AllowAny]
    
#      def post(self, request, *args, **kwargs):
#          response = JsonResponse({'message': 'Successfully logged out'})
#          response.delete_cookie('jwt_token', path='/')  # Deletes the cookie
#          return response


   
# class AuthUserView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request):
#         # Access the authenticated user
#         user =   str(request.user)
#          # Get the authenticated user
#         user = request.user
#         # You can return any fields from the User model or related models
#         user_data = {
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             'is_staff': user.is_staff,
#             'is_active': user.is_active,
#             'date_joined': user.date_joined,
#         }
#         print(user_data)
#         # Now you can return user details
#         if isinstance(user, AnonymousUser):
#            return Response({'message': 'Anonymous User'}, status=200)
#         return JsonResponse(user_data, status=status.HTTP_200_OK)
    
# class ForgotPasswordView(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request, *args, **kwargs):
#         email = request.data.get('email')
#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

#         # Generate token
#         token = default_token_generator.make_token(user)
#         uid = urlsafe_base64_encode(str(user.pk).encode())
#         reset_link = f'http://localhost:5173/reset-password/{uid}/{token}/'

#         # Send reset email
#         subject = 'Password Reset'
#         message = render_to_string('password_reset_email.html', {'reset_link': reset_link})
#         send_mail(subject, message, 'admin@example.com', [email])

#         return Response({"detail": "Password reset link has been sent to your email."}, status=status.HTTP_200_OK)
  


# class ResetPasswordView(APIView):
#    permission_classes = [AllowAny]
#    def post(self, request, *args, **kwargs):
#         uid = request.data.get('uid')
#         token = request.data.get('token')
#         password = request.data.get('password')

#         try:
#             uid = urlsafe_base64_decode(uid).decode()
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             return Response({"detail": "Invalid token or user."}, status=status.HTTP_400_BAD_REQUEST)

#         if not default_token_generator.check_token(user, token):
#             return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

#         user.set_password(password)
#         user.save()

#         return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        
# class ArtistViewSet(viewsets.ModelViewSet):
#     permission_classes = [AllowAny]
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer




# class AlbumViewSet(viewsets.ModelViewSet):
#     permission_classes = [AllowAny]
     
#     queryset = Album.objects.all()
#     serializer_class = AlbumSerializer



# class GenreViewSet(viewsets.ModelViewSet):
     
#     permission_classes = [AllowAny]
#     queryset = Genre.objects.all().reverse()
#     serializer_class = GenreSerializer


# class TrackViewSet(viewsets.ModelViewSet):
#     permission_classes = [AllowAny]
#     queryset = Track.objects.all()
#     serializer_class = TrackSerializer

   
    
# class AddTimesPlayedView(APIView):
#     permission_classes = [AllowAny]
#     def put(self, request, format=None):

        
#         try:
#             id = request.data.get('id')
#             num_times = request.data.get('num_times')
#             print(id)
#             print(num_times)
#             #Call the parent's update method to perform the actual update
#             Track.objects.filter(id=id).update(times_played =F('times_played') + 1)
#             Track.objects.filter(id=id).update(last_played =timezone.now())

      
    
#             print("Updating book:")
#             return Response({
#                 'message': 'Tracks clear from Playlist'
#             })
#         except stripe.error.CardError as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
 
       
    
# class PlaylistViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Playlist.objects.all()
#     serializer_class = PlaylistSerializer

 

#  # update playlist title
# class CreatePlaylistView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request, format=None):

#         title = request.data.get('title')
   
#         user = request.user
#         print(title)
#         print(user)

#         playlist = Playlist.objects.create(title=title, user=user)
#         playlist_serializer = PlaylistSerializer(playlist)
#         return Response(playlist_serializer.data, status=status.HTTP_201_CREATED)
    
# # update playlist title
# class CurrentPlaylistView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, id, format=None):
#         print(id)
#         playlist = Playlist.objects.get(id=id)
#         playlist_serializer = PlaylistSerializer(playlist)
#         return Response(playlist_serializer.data, status=status.HTTP_200_OK)

      

      
# # update playlist title
# class UpdatePlaylistTitleView(APIView):

#     permission_classes = [IsAuthenticated]
#     def put(self, request, format=None):
        
#         try:
        
#            title= request.data.get("title")
#            playlistId =request.data.get("playlistId")
#            playlist = Playlist.objects.get(id=playlistId)
#            playlist.title=title
#            playlist.save()
#            return Response({
#                 'message': f'{playlist}  title updated'
#             })
#         except playlist.error as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# # Add track from playlist
# class AddtoPlaylistView(APIView):

#     permission_classes = [IsAuthenticated]
#     def put(self, request, format=None):
#         {f"No results" }
#         try:
#            trackId= request.data.get("trackId")
#            playlistId =request.data.get("playlistId")
#            print(trackId, playlistId)
#            playlist = Playlist.objects.get(id=playlistId)
#            track = Track.objects.get(id=trackId)
#            playlist.tracks.add(track)
#            return Response({'message': f'{track.title}  added to {playlist.title}'}, status=status.HTTP_200_OK)
#         except Playlist.DoesNotExist:
#             return Response({'error': 'Playlist not found'}, status=status.HTTP_400_BAD_REQUEST)

# # Remove track from playlist
# class RemoveFromPlaylistView(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
#     def put(self, request, format=None):
        
#         try:
#            trackId, playlistId
#            trackId= request.data.get("trackId")
#            playlistId =request.data.get("playlistId")
#            playlist = Playlist.objects.get(id=playlistId)
#            track = Track.objects.get(id=trackId)
#            playlist.tracks.remove(track)
#            return Response({
#                 'message': 'track remove from playlist'
#             })
#         except playlist.error as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# #Clear all tracks from Playlist
# class ClearPlaylistView(APIView):
 
#     permission_classes = [IsAuthenticated]
#     def put(self, request, format=None):
        
#         try:
        

#            playlistId =request.data.get("playlistId")
#            playlist = Playlist.objects.get(id=playlistId)
#            playlist.tracks.clear()
#            return Response({'message': f'Tracks clear from {playlist.title}' })
#         except playlist.error as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# class DeletePlaylistView(APIView):

#     permission_classes = [IsAuthenticated]
#     def post(self, request, format=None):
#         try:
#            playlistId =request.data.get("playlistId")
#            playlist = Playlist.objects.get(id=playlistId)
#            playlist.delete()
#            return Response({
#                 'message': f'{playlist.title} delete from database'
#             })
#         except Playlist.DoesNotExist:
#             return Response({'error': 'Not FOund'}, status=status.HTTP_400_BAD_REQUEST)
        
 

 

      
# class PlayedViewSet(viewsets.ModelViewSet):
#       permission_classes = [IsAuthenticated]
#       queryset = Played.objects.all()
#       serializer_class = PlayedSerializer


#       def create(self, request, *args, **kwargs):
#         sub= Played.objects.create(user=request.user, tracks=request.data.get('trackId')) 
#         sub.save() 
#         # Custom logic before calling the default partial_update method
#         return super().create(request, *args, **kwargs)




# class PricingViewSet(viewsets.ModelViewSet):
#       permission_classes = [AllowAny]
#       queryset = Pricing.objects.all()
#       serializer_class = PricingSerializer
  


# class OrderViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

    
# # retrieve cuurent order
# class CurrentOrderView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, format=None):
#         current_order = Order.objects.latest('order_date')
#         order_serializer = OrderSerializer(current_order)
#         return Response(order_serializer.data, status=status.HTTP_200_OK)

      



# class SubcriptionViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Subscription.objects.all()
#     serializer_class = SubscriptionSerializer

    
# # update playlist title
# class CurrentSubView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, format=None):
#         current_sub = Subscription.objects.latest('start_date')
#         currentsub_serializer = SubscriptionSerializer(current_sub)
#         return Response(currentsub_serializer.data, status=status.HTTP_200_OK)
    

     


# #get latest song
# class LatestSongView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):
       
#      query =request.data.get("searchQuery")
         
#      tracks = Track.objects.filter(release_year='2023')
#      # Serialize the queryset
#      serializer = TrackSerializer(tracks, many=True)
    
    
#      if tracks:
#          # Return the serialized data as JSON
#          return Response(serializer.data)
#      else:
#         return   Response({f"No results" })
    
# #Most Played songs
# class MostPlayedSongs(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):
       
#             tracks = Track.objects.all().order_by('-times_played')[:20]
#             serializer = TrackSerializer(tracks, many=True)
#             if tracks:
#               return   Response(serializer.data)
#             else:
#                return   Response({f"No results" })

# #Recently Played songs
# class RecentlyPlayedSongs(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, *args, **kwargs):
       
           
         
#             tracks = Track.objects.all().order_by('-last_played')[:5]
#             serializer = TrackSerializer(tracks, many=True)
#             if tracks:
#               return   Response(serializer.data)
#             else:
#                return   Response({f"No results" })
    

# class FetchConfig(APIView):
#     permission_classes = [AllowAny]
#     def get(self, request, *args, **kwargs):
       
#             publishable_key = settings.STRIPE_PUBLISHABLE_KEY
#             print(publishable_key)
#             if publishable_key:
#               return   Response({'data':publishable_key})
#             else:
#                return   Response({f"No results" })



# #Create payment Intent with Strip Api
# class CreatePaymentIntentView(APIView):

#     permission_classes = [IsAuthenticated]
#     def post(self, request, format=None): 
#         try:
#             bills= request.data.get("bill")
#             plan= request.data.get("plan")
#             # Create a PaymentIntent
#             payment_intent = stripe.PaymentIntent.create(
#                 amount=bills * 100,  # Example amount in cents
#                 currency="usd",
#             )
#             pricing = Pricing.objects.get(plans=plan)
#             print(pricing)
#             NewOrder = Order.objects.create(owner=request.user, bill=bills, paymentid=payment_intent.id, payment=False, pricing=pricing) 
#             return Response({
#                 'client_secret': payment_intent.client_secret
#             })
#         except stripe.error.CardError as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# #Validate Card Payment
# class ConfirmPaymentIntentView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request, *args, **kwargs):
#             paymentintent =request.data.get("paymentIntent")
#             print(paymentintent)
#             if paymentintent['status'] == 'succeeded':
#                 subexists = Subscription.objects.filter(paymentid=paymentintent['id']) 
#                 if subexists:
#                      return  Response({'message': 'Payment already Validated!'})
#                 else:
#                      order = Order.objects.get(paymentid=paymentintent['id']) 
#                      print(order)
#                      sub= Subscription.objects.create(user=request.user, pricing=order.pricing, paymentid=order.paymentid, payment=order.payment, end_date=timezone.now().date() + timedelta(days=30), bill=order.bill,  payment_status='paid') 
#                      order.payment = True
#                      order.save()
#                      return Response({'message': 'payment completed!'})
#             else:
#                  return  Response({'message': paymentintent['status']})

        
            
        

# #Recover payment
# class RecoverPaymentIntentView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         try:
#             # Create a PaymentIntent
#             orderId =request.data.get("orderId")
#             order = Order.objects.get(id=orderId)
#             paymentid= order.paymentid

#             if order:
#                 paymentintent = stripe.PaymentIntent.retrieve(paymentid)
#                 if paymentintent:
#                       return  Response({'message': f"status:{paymentintent.status}, status:${paymentintent.amount}"})
#                 else:
#                      return  Response({'message': 'payment failed!'})
#             else:
#                 return  Response({'message': 'No orders yet!'})
#         except paymentintent.status as e:
#             return  Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# #search queay Api
# class SearchQueryView(APIView):

#     def get(self, request, *args, **kwargs):
       
#             # Use django-filter to filter the tracks
#         track_filter = TrackFilter(request.query_params, queryset=Track.objects.all())
#         if track_filter.is_valid():
#            tracks = track_filter.qs

#            # Serialize and return the filtered tracks
#            serializer = TrackSerializer(tracks, many=True)
#            return Response(serializer.data)
#         else:
#             return Response(track_filter.errors, status=status.HTTP_400_BAD_REQUEST)



