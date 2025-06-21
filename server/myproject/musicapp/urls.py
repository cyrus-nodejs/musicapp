
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from rest_framework import routers
from .serializers import CustomTokenObtainPairSerializer

from .view.Pricing import PricingViewSet
from .view.Search import SearchQueryView
from .view.Home import IndexView
from .view.Artist import ArtistViewSet
from .view.Genre import GenreViewSet
from .view.Album import AlbumViewSet


from .view.Auth import (
    RegisterUserView,
    AuthUserView,
    ForgotPasswordView,
    ResetPasswordView,
    LogoutView,
)
from .view.Track import (
    TrackViewSet,
    AddTimesPlayedView,
    LatestSongView,
    RecentlyPlayedSongs,
    MostPlayedSongs,
)

from .view.Playlist import (
    PlaylistViewSet,
    AddtoPlaylistView,
    CurrentPlaylistView,
    UpdatePlaylistTitleView,
    ClearPlaylistView,
    CreatePlaylistView,
    RemoveFromPlaylistView,
    DeletePlaylistView,
)


from .view.Order import (
    OrderViewSet,
    ConfirmPaymentIntentView,
    CreatePaymentIntentView,
    CurrentOrderView,
    RecoverPaymentIntentView,
)

from .view.Subscription import(
    SubscriptionViewSet,
    CurrentSubView
  )




app_name = 'musicapp'



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
    path('', include(router.urls)),
          path('', IndexView, name='home'),
       path('register/', RegisterUserView.as_view(), name='register'),
      path('login/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', AuthUserView.as_view(), name='authuser'),
        path('request-password/', ForgotPasswordView.as_view(), name='forgot-password'),
         path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
        path('logout/', LogoutView.as_view(), name='logout'),
    path('create-payment/', CreatePaymentIntentView.as_view()),
    path('confirm-payment/', ConfirmPaymentIntentView.as_view() ),
    path('recover-payment/', RecoverPaymentIntentView.as_view() ),
     path('search/', SearchQueryView.as_view() ),
      path('most-played/', MostPlayedSongs.as_view() ),
      path('latest-tracks/', LatestSongView.as_view() ),
      path('recently-played/', RecentlyPlayedSongs.as_view() ),
       path('times-played/', AddTimesPlayedView.as_view() ),
        path('clear-playlist/', ClearPlaylistView.as_view() ),
         path('remove-from-playlist/', RemoveFromPlaylistView.as_view() ),
          path('add-to-playlist/', AddtoPlaylistView.as_view() ),
           path('update-playlist-title/', UpdatePlaylistTitleView.as_view() ),
           path('delete-playlist/', DeletePlaylistView.as_view() ),
            path('create-playlist/', CreatePlaylistView.as_view() ),
             path('current-playlist/<int:id>/', CurrentPlaylistView.as_view(), name='current-playlist-by-id'),
              path('current-sub/', CurrentSubView.as_view() ),
                path('current-order/',  CurrentOrderView.as_view()),
               # path('fetch-config/', FetchConfig.as_view() ),
                
            
 
]