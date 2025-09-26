from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            response.set_cookie(
                key='access_token',
                value=response.data['access'],
                httponly=True,
                secure=False,  # Cambia a True en producción con HTTPS
                samesite='Lax'
            )
        return response