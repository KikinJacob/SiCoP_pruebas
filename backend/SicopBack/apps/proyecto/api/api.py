from apps.proyecto.models import Proyecto
from rest_framework import viewsets, permissions
from .serializers import ProyectoSerializer
from rest_framework import filters  
from rest_framework.permissions import IsAuthenticated

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProyectoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombreProyecto']