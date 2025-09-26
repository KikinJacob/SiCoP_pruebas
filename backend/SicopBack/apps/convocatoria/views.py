from datetime import date
from rest_framework import generics
from apps.convocatoria.models import Convocatoria
from apps.convocatoria.api.serializers import ConvocatoriaSerializer
from rest_framework.permissions import IsAuthenticated

class ConvocatoriaListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Convocatoria.objects.all()
    serializer_class = ConvocatoriaSerializer
    def get_queryset(self):
        today = date.today()
        return Convocatoria.objects.filter(fechaFinFinanciamiento__gte=today)

class ConvocatoriaRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Convocatoria.objects.all()
    serializer_class = ConvocatoriaSerializer