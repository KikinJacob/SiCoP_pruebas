from django.urls import path, include
from rest_framework import routers
from apps.estudiante.views import EstudianteViewSet

router = routers.DefaultRouter()
router.register(r'estudiantes', EstudianteViewSet, basename='estudiante')

urlpatterns = [
    path("", include(router.urls)),
]
