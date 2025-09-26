from rest_framework import viewsets
from apps.credenciales.models import Credenciales
from apps.credenciales.api.serializer import CredencialesSerializer

class CredencialesViewSet(viewsets.ModelViewSet):
    queryset = Credenciales.objects.all()
    serializer_class = CredencialesSerializer