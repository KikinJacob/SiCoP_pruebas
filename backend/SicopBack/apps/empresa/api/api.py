from apps.empresa.models import Empresa
from rest_framework import viewsets, permissions, filters
from .serializers import EmpresaSerializers



class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializers
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['razonSocial']
    ordering_fields = ['razonSocial']
