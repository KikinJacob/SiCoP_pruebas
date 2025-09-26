from django.urls import path, include
from rest_framework import routers
from apps.proyecto.views import ProyectoViewSet

router = routers.DefaultRouter()
router.register(r'proyectos', ProyectoViewSet, basename='proyecto')

urlpatterns = [
    path("", include(router.urls)),
]
