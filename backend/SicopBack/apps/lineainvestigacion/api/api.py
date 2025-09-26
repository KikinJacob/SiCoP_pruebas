from apps.lineainvestigacion.models import LineaInvestigacion
from rest_framework import viewsets
from  .serializers import LineaInvestigacionSerializer


class LineaInvestigacionViewSet(viewsets.ModelViewSet):
        queryset = LineaInvestigacion.objects.all()
        serializer_class = LineaInvestigacionSerializer
