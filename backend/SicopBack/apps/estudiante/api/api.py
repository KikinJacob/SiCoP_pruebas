from rest_framework import viewsets
from apps.estudiante.models import Estudiante
from apps.estudiante.api.serializers import EstudianteSerializer

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer