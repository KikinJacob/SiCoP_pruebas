from rest_framework import viewsets
from apps.empresa.models import Empresa
from apps.empresa.api.serializers import EmpresaSerializer

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
