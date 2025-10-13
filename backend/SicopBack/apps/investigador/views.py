from rest_framework import viewsets
from apps.investigador.models import Investigador
from apps.investigador.api.serializers import InvestigadorSerializer
from rest_framework.response import Response
from apps.users.models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
from apps.investigador.models import Investigador
from apps.investigador.api.serializer import InvestigadorSerializer
from rest_framework.permissions import IsAuthenticated
from apps.credenciales.models import Credenciales as Credencial

class InvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer


class DarAccesoInvestigador(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk): 
        try:
            investigador = Investigador.objects.get(curp=pk)
            
            if not investigador.user:
                
                # Password generada por mi 
                password_generada = "cambio123"
                user = User.objects.create_user(
                    username=investigador.correo,
                    email=investigador.correo,
                    password=password_generada
                )

                # Crear la credencial para este usuario
                credencial = Credencial.objects.create(
                    Rol="Investigador",
                    user_id=user
                )

                # Asociar ambos al investigador
                investigador.user = user
                investigador.id_Credencial = credencial
                investigador.save()

                return Response({
                    "detail": "Acceso otorgado correctamente.",
                    "usuario": investigador.correo,
                    "password": password_generada
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"detail": "El investigador ya tiene acceso"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Investigador.DoesNotExist:
            return Response(
                {"detail": "Investigador no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

class QuitarAccesoInvestigador(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        try:
            # Buscar al investigador por su CURP
            investigador = Investigador.objects.get(curp=pk)

            # Verificar si el investigador tiene un usuario asociado
            if investigador.user:
                # Eliminar las credenciales asociadas (opcional)
                if investigador.id_Credencial:
                    investigador.id_Credencial.delete()

                # Eliminar el usuario asociado
                investigador.user.delete()

                # Desasociar el usuario y las credenciales del investigador
                investigador.user = None
                investigador.id_Credencial = None
                investigador.save()

                return Response(
                    {"detail": "Acceso eliminado correctamente."},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"detail": "El investigador no tiene acceso asignado."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Investigador.DoesNotExist:
            return Response(
                {"detail": "Investigador no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
class InvestigadorListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer

class InvestigadorRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer