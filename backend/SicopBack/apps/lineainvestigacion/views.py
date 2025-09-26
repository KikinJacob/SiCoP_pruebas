from rest_framework import viewsets
from apps.lineainvestigacion.models import LineaInvestigacion
from apps.lineainvestigacion.api.serializers import LineaInvestigacionSerializer

class LineaInvestigacionViewSet(viewsets.ModelViewSet):
    queryset = LineaInvestigacion.objects.all()
    serializer_class = LineaInvestigacionSerializer
