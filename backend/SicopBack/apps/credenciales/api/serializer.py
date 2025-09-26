from rest_framework import serializers
from apps.credenciales.models import Credenciales

class CredencialesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credenciales
        fields = '__all__'