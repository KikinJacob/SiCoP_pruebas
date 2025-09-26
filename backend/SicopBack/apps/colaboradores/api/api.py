from rest_framework import viewsets
from apps.colaboradores.models import Colaboradores
from backend.SicopBack.apps.colaboradores.api.serializers import ColaboradoresSerializer

class ColaboradoresViewSet(viewsets.ModelViewSet):
    queryset = Colaboradores.objects.all()
    serializer_class = ColaboradoresSerializer