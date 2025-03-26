
# from .views import  RegisterUserView,  AuthUserView,  SearchQueryView,  LogoutView,  AlbumViewSet, TrackViewSet, ForgotPasswordView, ResetPasswordView
# from .views import  AddTimesPlayedView, MostPlayedSongs, RecentlyPlayedSongs, LatestSongView, ArtistViewSet, GenreViewSet
# from .views import PlayedViewSet, PricingViewSet, OrderViewSet, CurrentOrderView,CurrentSubView, SubcriptionViewSet, ConfirmPaymentIntentView, CreatePaymentIntentView,RecoverPaymentIntentView
# from .views import PlaylistViewSet, RemoveFromPlaylistView,FetchConfig, CurrentPlaylistView, ClearPlaylistView, DeletePlaylistView, UpdatePlaylistTitleView, AddtoPlaylistView, CreatePlaylistView
from .serializers import CustomTokenObtainPairSerializer

from .view.Auth import RegisterUserView, AuthUserView, ForgotPasswordView, ResetPasswordView
from .view.Artist import ArtistViewSet
from .view.Genre import GenreViewSet
from .view.Album import AlbumViewSet
from .view.Track import TrackViewSet, AddTimesPlayedView, LatestSongView, RecentlyPlayedSongs, MostPlayedSongs
from .view.Playlist import PlaylistViewSet, AddtoPlaylistView, CurrentPlaylistView,UpdatePlaylistTitleView, ClearPlaylistView, CreatePlaylistView, RemoveFromPlaylistView, DeletePlaylistView
from .view.Order import OrderViewSet, ConfirmPaymentIntentView, CreatePaymentIntentView, CurrentOrderView, RecoverPaymentIntentView
from .view.Subscription import SubscriptionViewSet, CurrentSubView
from .view.Pricing import PricingViewSet
from .view.Search import SearchQueryView
from .view.Home import IndexView

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
# router.register(r'played', PlayedViewSet, basename='played')  # Register the viewset with the router
router.register(r'playlist', PlaylistViewSet, basename='playlist')  # Register the viewset with the router
router.register(r'order', OrderViewSet, basename='order')  # Register the viewset with the router
router.register(r'subscription', SubscriptionViewSet, basename='subscription')  # Register the viewset with the router
router.register(r'price', PricingViewSet, basename='price')  # Register the viewset with the router


urlpatterns = [
    path('api/', include(router.urls)),
          path('', IndexView, name='home'),
       path('api/register/', RegisterUserView.as_view(), name='register'),
      path('api/login/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),

    path('api/user/', AuthUserView.as_view(), name='authuser'),
        path('api/request-password/', ForgotPasswordView.as_view(), name='forgot-password'),
         path('api/reset-password/', ResetPasswordView.as_view(), name='reset-password'),
      #  path('api/logout/', LogoutView.as_view(), name='logout'),
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
              path('api/current-sub/', CurrentSubView.as_view() ),
                path('api/current-order/',  CurrentOrderView.as_view()),
               # path('api/fetch-config/', FetchConfig.as_view() ),
                
            
 
]