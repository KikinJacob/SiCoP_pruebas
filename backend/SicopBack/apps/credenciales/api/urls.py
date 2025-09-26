from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.credenciales.views import CredencialesViewSet
from apps.credenciales.views import CookieTokenObtainPairView
from apps.credenciales.views import LogoutView
from apps.credenciales.views import CheckAuthView
from apps.credenciales.views import UserRoleView

router = DefaultRouter()
router.register(r'credenciales', CredencialesViewSet, basename='credenciales')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', CheckAuthView.as_view(), name='check_auth'),
    path('rol/', UserRoleView.as_view(), name='user_rol'),
]
