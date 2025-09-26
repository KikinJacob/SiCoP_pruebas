from rest_framework import viewsets
from apps.carrera.models import Carrera
from apps.carrera.api.serializer import CarreraSerializer

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer