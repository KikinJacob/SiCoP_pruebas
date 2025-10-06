from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.investigador.api.api import InvestigadorViewSet
from apps.investigador.views import InvestigadorListCreateAPIView, InvestigadorRetrieveUpdateDestroyAPIView, DarAccesoInvestigador, QuitarAccesoInvestigador

router = DefaultRouter()
router.register(r'investigadores', InvestigadorViewSet, basename='investigador')

urlpatterns = router.urls + [
    path('', InvestigadorListCreateAPIView.as_view(), name='investigador-list-create'),
    path('<str:pk>/', InvestigadorRetrieveUpdateDestroyAPIView.as_view(), name='investigador-detail'),
    
    # RUTA PARA DAR ACCESO AL INVESTIGADOR
    path('<str:pk>/dar-acceso/', DarAccesoInvestigador.as_view(), name='dar_acceso_investigador'),
    
    # RUTA PARA QUITAR ACCESO AL INVESTIGADOR
    path('<str:pk>/quitar-acceso/', QuitarAccesoInvestigador.as_view(), name='quitar_acceso_investigador'),
]