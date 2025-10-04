from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from apps.proyecto.models import Proyecto
from apps.investigador.models import Investigador
from apps.proyecto.api.serializers import ProyectoResumenSerializer, ProyectoDetalleSerializer, ProyectoRegistroSerializer
from rest_framework.generics import RetrieveAPIView 

# class ProyectoDetallePorClaveView(RetrieveAPIView):
#     queryset = Proyecto.objects.all()
#     serializer_class = ProyectoSerializer
#     lookup_field = 'claveInterna'

class ProyectoInvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    
    def get_queryset(self):
        # Obtener el investigador relacionado con el usuario autenticado
        try:
            investigador = Investigador.objects.get(user=self.request.user)
            return Proyecto.objects.filter(liderProyecto=investigador)
        except Investigador.DoesNotExist:
            return Proyecto.objects.none()


    def get_serializer_class(self):
        if self.action == 'list':
            return ProyectoResumenSerializer
        elif self.action == 'retrieve':
            return ProyectoDetalleSerializer
        return ProyectoRegistroSerializer

    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            print("🟢 Datos recibidos: ", request.data)
            if serializer.is_valid():
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("❌ Errores de validación:")
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProyectoAdminViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return ProyectoResumenSerializer
        elif self.action == 'retrieve':
            return ProyectoDetalleSerializer
        return ProyectoRegistroSerializer

