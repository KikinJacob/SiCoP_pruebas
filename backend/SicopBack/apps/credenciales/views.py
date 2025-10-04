from rest_framework import viewsets
from apps.credenciales.models import Credenciales
from apps.credenciales.api.serializers import CredencialesSerializer
from apps.investigador.models import Investigador 
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout


class CredencialesViewSet(viewsets.ModelViewSet):
    queryset = Credenciales.objects.all()
    serializer_class = CredencialesSerializer
    permission_classes = [IsAuthenticated]

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            response.set_cookie(
                key='access_token',
                value=response.data['access'],
                httponly=True,
                secure=False, 
                samesite='Lax',
                path='/',
            )
        return response

class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        curp = None
        try:
            investigador = Investigador.objects.get(user=request.user)
            curp = investigador.curp
        except Investigador.DoesNotExist:
            curp = None
        return Response({
            "authenticated": True,
            "username": request.user.username,
            "curp": curp
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        response = Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        return response

class UserRoleView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        credencial = Credenciales.objects.filter(user=request.user).first()
        user_role = getattr(credencial, 'Rol', 'No definido') if credencial else 'No definido'
        return Response({'Rol': user_role})
