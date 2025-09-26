from django.urls import path
from apps.users.api.api import UserAPIview, user_datail_api_view
from apps.users.views import CookieTokenObtainPairView

urlpatterns = [
    path('usuario/', UserAPIview, name='usuario_api'),
    path('usuario/<int:pk>/', user_datail_api_view, name='usuario_datail_api_view'),
    path('login/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
]