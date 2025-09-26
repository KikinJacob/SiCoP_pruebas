from rest_framework import serializers
from apps.lineainvestigacion.models import LineaInvestigacion

class LineaInvestigacionSerializer(serializers.ModelSerializer):
        class Meta:
            model = LineaInvestigacion
            fields = '__all__'