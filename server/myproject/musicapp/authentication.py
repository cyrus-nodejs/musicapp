import jwt
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import authentication, exceptions
from django.conf import settings
from django.contrib.auth.models import User
from .utils import decode_jwt





class JWTAuthenticationFromCookie(authentication.BaseAuthentication):
    def authenticate(self, request):
        # Get the token from cookies
        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return None  # No authentication credentials provided

        try:
            # Assuming the token is in the form 'Bearer <token>'
            prefix, token = token.split(' ')
            if prefix != 'Bearer':
                raise exceptions.AuthenticationFailed('Authorization header must start with Bearer')

            # Decode the token using the secret key and verify its validity

            payload = decode_jwt(token)
            # Retrieve the user from the payload
            user = self.get_user_from_payload(payload)
            print(user)
            
          
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Error decoding token')
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')
        return (user, None)  # Return the user and token
      
    def get_user_from_payload(self, payload):
        # Fetch the user from the database using the payload's information (usually user ID)
        try:
            return User.objects.get(id=payload['id'])
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')