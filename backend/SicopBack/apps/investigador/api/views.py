from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.investigador.models import Investigador
from apps.users.models import User
from apps.credenciales.models import Credenciales

# METODO PARA DAR ACCESO A UN INVESTIGADOR
class DarAccesoInvestigador(APIView):
    def post(self, request):
        curp = request.data.get('curp')
        rol = request.data.get('Rol')
        try:
            investigador = Investigador.objects.get(curp=curp)
            if not investigador.user:
                password = "cambio123" 
                user = User.objects.create_user(
                    username=investigador.correo,
                    email=investigador.correo,
                    password=password
                )
                credencial, created = Credenciales.objects.get_or_create(
                    user=user,
                    defaults={
                        'Rol': rol
                    }
                )
                investigador.user = user
                investigador.id_Credencial = credencial
                investigador.save()
                return Response({"detail": "Acceso otorgado", "password": password}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Ya tiene acceso"}, status=status.HTTP_200_OK)
        except Investigador.DoesNotExist:
            return Response({"detail": "Investigador no encontrado"}, status=status.HTTP_404_NOT_FOUND)
