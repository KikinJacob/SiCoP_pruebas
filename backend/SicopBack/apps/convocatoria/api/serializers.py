from rest_framework import serializers
from apps.convocatoria.models import Convocatoria

class ConvocatoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convocatoria
        fields = '__all__'
