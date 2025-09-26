from rest_framework import generics
from apps.carrera.models import Carrera
from apps.carrera.api.serializers import CarreraSerializer

class CarreraListCreateAPIView(generics.ListCreateAPIView):
    queryset = Carrera.objects.all().order_by('nombreCarrera')
    serializer_class = CarreraSerializer

class CarreraRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer

class CarreraListAPIView(generics.ListAPIView):
    queryset = Carrera.objects.all().order_by('nombreCarrera')
    serializer_class = CarreraSerializer