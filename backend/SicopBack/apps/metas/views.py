from rest_framework import viewsets
from apps.metas.models import Metas
from apps.metas.api.serializers import MetasSerializer

class MetasViewSet(viewsets.ModelViewSet):
    queryset = Metas.objects.all()
    serializer_class = MetasSerializer
