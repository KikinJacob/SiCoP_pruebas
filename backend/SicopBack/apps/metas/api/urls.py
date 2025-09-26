from django.urls import path, include
from rest_framework import routers
from apps.metas.views import MetasViewSet

router = routers.DefaultRouter()
router.register(r'metas', MetasViewSet, basename='metas')

urlpatterns = [
    path("", include(router.urls)),
]
