import jwt
import datetime
from django.conf import settings
from rest_framework.response import Response
# Function to encode JWT
def encode_jwt(payload):
    payload['exp'] = datetime.datetime.now() + datetime.timedelta(days=30)  # Set expiration time
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

# Function to decode JWT
def decode_jwt(token):
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return Response({'message': 'Token expired'})
    except jwt.InvalidTokenError:
         Response({'message': 'Invalid Token'})
