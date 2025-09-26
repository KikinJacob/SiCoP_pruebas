from rest_framework import serializers
from apps.colaboradores.models import Colaboradores

class ColaboradoresSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='investigador.nombre', read_only=True)
    apellidos = serializers.CharField(source='investigador.apellidos', read_only=True)
    curp = serializers.CharField(source='investigador.curp', read_only=True)
    
    class Meta:
        model = Colaboradores
        fields = '__all__'