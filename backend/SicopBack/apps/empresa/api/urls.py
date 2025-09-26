from django.urls import path, include
from rest_framework import routers
from apps.empresa.views import EmpresaViewSet

router = routers.DefaultRouter()
router.register(r'empresas', EmpresaViewSet, basename='empresa')

urlpatterns = [
    path("", include(router.urls)),
]