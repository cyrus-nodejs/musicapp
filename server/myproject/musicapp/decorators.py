# decorators.py
from functools import wraps
from django.http import JsonResponse
from .utils import decode_jwt
from django.contrib.auth.models import User

def jwt_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Get the JWT token from cookies
        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return JsonResponse({'error': 'No token'}, status=401)

        try:
            # Decode the JWT token to get the user data
            payload = decode_jwt(token)

            # Set the user from the decoded payload
            user = User.objects.get(id=payload['id'])
            request.user = user

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=401)

        # Call the original view
        return view_func(request, *args, **kwargs)

    return _wrapped_view
