from rest_framework import serializers
from apps.empresa.models import Empresa

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'rfc': instance.rfc,
            'razonSocial': instance.razonSocial,
            'sector': instance.sector,
            'tipo_empresa': instance.tipoEmpresa,
        }