
import os
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import AnonymousUser
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from ..serializers import  UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.template.loader import render_to_string
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests 














class RegisterUserView(APIView):
     permission_classes = [AllowAny]
     def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User created successfully',
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, message='status.HTTP_400_BAD_REQUEST', status=status.HTTP_400_BAD_REQUEST)
     
class LogoutView(APIView):
     permission_classes = [IsAuthenticated]

     def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

   
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
    
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode())
        reset_link = f'http://localhost:5173/reset-password/{uid}/{token}/'

        # Send reset email
        subject = 'Password Reset'
        message = render_to_string('password_reset_email.html', {'reset_link': reset_link})
        send_mail(subject, message, 'admin@example.com', [email])

        return Response({"detail": "Password reset link has been sent to your email."}, status=status.HTTP_200_OK)
  


class ResetPasswordView(APIView):
   permission_classes = [AllowAny]
   def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        password = request.data.get('password')

        try:
            uid = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "Invalid token or user."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()

        return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)


   

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        token = request.data.get('credential')

        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                google_requests.Request(),
                os.getenv('Google_ClientId')
               
                
            )

            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            user, created = User.objects.get_or_create(email=email, defaults={
                'username': email,
                'first_name': first_name,
                'last_name': last_name,
            })

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })

        except ValueError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
