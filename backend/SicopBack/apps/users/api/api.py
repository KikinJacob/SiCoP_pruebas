from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view 
from apps.users.models import User
from apps.users.api.serializers import UserSerializer, UserListSerializer

@api_view(['GET', 'POST'])
def UserAPIview(request):
    
    #list/lista
    if request.method == 'GET':

        #queryset/conjunto de consultas 
        users = User.objects.all().values('id', 'username', 'email', 'password', 'name')
        users_serializers = UserListSerializer(users,many = True)

        return Response(users_serializers.data, status= status.HTTP_200_OK)
    
    #create/crear
    elif request.method == 'POST':
        user_serializers = UserSerializer(data= request.data)

        #validation 
        if user_serializers.is_valid():
            user_serializers.save()
            return Response({'message' : 'Usuario Creado Correctamente'}, status= status.HTTP_201_CREATED)
        
        return Response(user_serializers.errors, status= status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user_datail_api_view(resquest, pk = None):

    #queryset/conjunto de consultas 
    user = User.objects.filter(id = pk).first()

    #validation
    if user:

        #retrieve/recuperar
        if resquest.method == 'GET':
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data, status= status.HTTP_200_OK)
        
        #update/actualizar
        elif resquest.method == 'PUT':
            user_serializer = UserSerializer(user, data = resquest.data)

            if user_serializer.is_valid():
                user_serializer.save()

                return Response(user_serializer.data, status= status.HTTP_200_OK)
            
            return Response (user_serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        
        #delete/eliminar
        elif resquest.method == 'DELETE':
            user.delete()

            return Response({'message' : 'Usuario Eliminado Correctamente!'}, status= status.HTTP_200_OK)
    
    return Response({'message' : 'No Se Ha Encontrado Un Usuario Con Estos Datos'}, status= status.HTTP_400_BAD_REQUEST)