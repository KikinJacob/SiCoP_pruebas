from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.investigador.api.api import InvestigadorViewSet
from apps.investigador.api.views import DarAccesoInvestigador
from apps.investigador.views import InvestigadorListCreateAPIView, InvestigadorRetrieveUpdateDestroyAPIView

router = DefaultRouter()
router.register(r'investigadores', InvestigadorViewSet, basename='investigador')

urlpatterns = router.urls + [
    # RUTA PARA DAR ACCESO AL INVESTIGADOR
    path('dar-acceso/', DarAccesoInvestigador.as_view(), name='dar_acceso_investigador'),
    path('', InvestigadorListCreateAPIView.as_view(), name='investigador-list-create'),
    path('<str:pk>/', InvestigadorRetrieveUpdateDestroyAPIView.as_view(), name='investigador-detail'),
]