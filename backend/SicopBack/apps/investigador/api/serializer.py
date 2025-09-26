from rest_framework import serializers
from apps.investigador.models import Investigador

class InvestigadorSerializer(serializers.ModelSerializer):
    nombreCarrera = serializers.CharField(source='claveCarrera.nombreCarrera', read_only=True)
    
    class Meta:
        model = Investigador
        fields = '__all__'

        extra_fields = ['nombre_carrera']