from django.urls import path
from apps.colaboradores.views import ColaboradorListCreateAPIView, ColaboradorRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ColaboradorListCreateAPIView.as_view(), name='colaborador-list-create'),  # Para /colaboradores/
    path('colaboradores/', ColaboradorListCreateAPIView.as_view(), name='colaborador-list-create'),
    path('colaboradores/<int:pk>/', ColaboradorRetrieveUpdateDestroyAPIView.as_view(), name='colaborador-detail'),
]
