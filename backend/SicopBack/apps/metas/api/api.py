from apps.metas.models import Metas
from rest_framework import viewsets, permissions
from .serializers import MetasSerialier

class MetasViewSet(viewsets.ModelViewSet):
    queryset = Metas.objects.all()
    serializer_class = MetasSerialier