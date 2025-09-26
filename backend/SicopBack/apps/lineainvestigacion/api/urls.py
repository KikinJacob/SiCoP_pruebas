from django.urls import path, include
from rest_framework import routers
from apps.lineainvestigacion.views import LineaInvestigacionViewSet

router = routers.DefaultRouter()
router.register(r'lineas', LineaInvestigacionViewSet, basename='lineainvestigacion')

urlpatterns = [
    path("", include(router.urls)),
]


# router.register(r'lineas', LineaInvestigacionViewSet, 'addlineainvestigacion')