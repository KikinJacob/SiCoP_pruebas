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

class InvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer

class DarAccesoInvestigador(APIView):
    def post(self, request):
        investigador_id = request.data.get('id')
        try:
            investigador = Investigador.objects.get(id=investigador_id)
            if not investigador.user:
                # Crea usuario con el correo como username y email
                user = User.objects.create_user(
                    username=investigador.correo,
                    email=investigador.correo,
                    password=User.objects.make_random_password()
                )
                investigador.user = user
                investigador.save()
                # Aquí podrías enviar un correo con la contraseña generada
            return Response({"detail": "Acceso otorgado"}, status=status.HTTP_200_OK)
        except Investigador.DoesNotExist:
            return Response({"detail": "Investigador no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class InvestigadorListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer

class InvestigadorRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer