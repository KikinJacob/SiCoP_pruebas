from rest_framework import serializers
from apps.users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validate_data):
        update_user = super().update(instance, validate_data)
        update_user.set_password(validate_data['password'])
        update_user.save()
        return update_user
    
class UserListSerializer(serializers.ModelSerializer):  
    class Meta: User

    def to_representation(self, instance):
        return {
            'id' : instance['id'],
            'username' : instance['username'],
            'email' : instance['email'],
            'password' : instance['password']
        }