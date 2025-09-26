from rest_framework import generics
from apps.colaboradores.models import Colaboradores
from apps.colaboradores.api.serializers import ColaboradoresSerializer

class ColaboradorListCreateAPIView(generics.ListCreateAPIView):
    queryset = Colaboradores.objects.all()
    serializer_class = ColaboradoresSerializer

class ColaboradorRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Colaboradores.objects.all()
    serializer_class = ColaboradoresSerializer
