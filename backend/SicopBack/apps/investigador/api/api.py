from rest_framework import viewsets
from apps.investigador.models import Investigador
from apps.investigador.api.serializers import InvestigadorSerializer
from rest_framework.permissions import IsAuthenticated

class InvestigadorViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer