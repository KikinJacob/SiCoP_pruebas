from django.urls import path
from apps.carrera.views import CarreraListAPIView
from rest_framework.routers import DefaultRouter
from apps.carrera.api.api import CarreraViewSet

router = DefaultRouter()
router.register(r'carreras', CarreraViewSet, basename='carrera')

urlpatterns = urlpatterns = [
    path('carreras/', CarreraListAPIView.as_view(), name='carrera-list'),
]
