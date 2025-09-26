from rest_framework import serializers
from apps.credenciales.models import Credenciales

class CredencialesSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Credenciales
        fields = '__all__'