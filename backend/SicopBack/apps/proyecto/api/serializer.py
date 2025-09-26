from rest_framework import serializers
from apps.proyecto.models import Proyecto

class ProyectoSerializer(serializers.ModelSerializer):
    convocatoria_rfc = serializers.CharField(source="rfc_convocatoria.rfc", read_only=True)
    empresa_nombre = serializers.CharField(source="rfc.rfc", read_only=True)
    linea_investigacion_nombre = serializers.CharField(source="lineaInvestigacion_LineaPk.nombre", read_only=True)

    class Meta:
        model = Proyecto
        fields = '__all__'