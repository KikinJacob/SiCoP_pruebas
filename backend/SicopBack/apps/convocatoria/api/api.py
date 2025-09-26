from apps.convocatoria.models import Convocatoria
from rest_framework import viewsets, filters
from .serializers import ConvocatoriaSerializer


class ConvocatoriaViewSet(viewsets.ModelViewSet):
    queryset = Convocatoria.objects.all()
    serializer_class = ConvocatoriaSerializer
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['convocatoria']
    ordering_fields = ['convocatoria']

 