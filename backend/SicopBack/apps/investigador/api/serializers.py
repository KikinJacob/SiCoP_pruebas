from rest_framework import serializers
from apps.investigador.models import Investigador
from apps.carrera.models import Carrera

class InvestigadorSerializer(serializers.ModelSerializer):
    carrera = serializers.SerializerMethodField()

    class Meta:
        model = Investigador
        fields = '__all__'  # Incluye todos los campos del modelo
        # También se incluirá el campo calculado "carrera"

    def get_carrera(self, obj):
        try:
            return obj.claveCarrera.nombreCarrera  # si claveCarrera es ForeignKey
        except AttributeError:
            return None

