
from .views import  RegisterUserView,  AuthUserView,  SearchQueryView,  LogoutView,  AlbumViewSet, TrackViewSet
from .views import  AddTimesPlayedView, MostPlayedSongs, RecentlyPlayedSongs, LatestSongView, ArtistViewSet, GenreViewSet
from .views import PlayedViewSet, PricingViewSet, OrderViewSet, SubcriptionViewSet, ConfirmPaymentIntentView, CreatePaymentIntentView,RecoverPaymentIntentView
from .views import PlaylistViewSet, RemoveFromPlaylistView, CurrentPlaylistView, ClearPlaylistView, DeletePlaylistView, UpdatePlaylistTitleView, AddtoPlaylistView, CreatePlaylistView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path, include
from rest_framework import routers

app_name = 'soundapp'



router = routers.DefaultRouter()

# router.register(r'register', UserViewSet,  basename='register')  # Register the viewset with the router
router.register(r'albums', AlbumViewSet,  basename='album')  # Register the viewset with the router
router.register(r'artists', ArtistViewSet, basename='artistss')  # Register the viewset with the router
router.register(r'genres', GenreViewSet, basename='genres')  # Register the viewset with the router
router.register(r'tracks', TrackViewSet,  basename='songs')  # Register the viewset with the router
router.register(r'played', PlayedViewSet, basename='played')  # Register the viewset with the router
router.register(r'playlist', PlaylistViewSet, basename='playlist')  # Register the viewset with the router
router.register(r'order', OrderViewSet, basename='order')  # Register the viewset with the router
router.register(r'subscription', SubcriptionViewSet, basename='subscription')  # Register the viewset with the router
router.register(r'price', PricingViewSet, basename='price')  # Register the viewset with the router


urlpatterns = [
    path('api/', include(router.urls)),
       path('api/register/', RegisterUserView.as_view(), name='register'),
      path('api/login/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('api/user/', AuthUserView.as_view(), name='authuser'),
       path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/create-payment/', CreatePaymentIntentView.as_view()),
    path('api/confirm-payment/', ConfirmPaymentIntentView.as_view() ),
    path('api/recover-payment/', RecoverPaymentIntentView.as_view() ),
     path('api/search/', SearchQueryView.as_view() ),
      path('api/most-played/', MostPlayedSongs.as_view() ),
      path('api/latest-tracks/', LatestSongView.as_view() ),
      path('api/recently-played/', RecentlyPlayedSongs.as_view() ),
       path('api/times-played/', AddTimesPlayedView.as_view() ),
        path('api/clear-playlist/', ClearPlaylistView.as_view() ),
         path('api/remove-from -playlist/', RemoveFromPlaylistView.as_view() ),
          path('api/add-to-playlist/', AddtoPlaylistView.as_view() ),
           path('api/update-playlist-title/', UpdatePlaylistTitleView.as_view() ),
           path('api/delete-playlist/', DeletePlaylistView.as_view() ),
            path('api/create-playlist/', CreatePlaylistView.as_view() ),
             path('api/current-playlist/<int:id>', CurrentPlaylistView.as_view() ),
            
 
]