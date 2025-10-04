from django.urls import path, include
from rest_framework import routers
from apps.proyecto.views import ProyectoInvestigadorViewSet, ProyectoAdminViewSet

router = routers.DefaultRouter()
router.register(r'proyectos-investigadores', ProyectoInvestigadorViewSet, basename='proyecto-investigador')
router.register(r'proyectos-admin', ProyectoAdminViewSet, basename='proyecto-admin')

urlpatterns = [
    path("", include(router.urls)),
]
