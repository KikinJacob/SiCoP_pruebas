from django.urls import path
from apps.convocatoria.views import ConvocatoriaListCreateAPIView, ConvocatoriaRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', ConvocatoriaListCreateAPIView.as_view(), name='convocatoria-list-create'),
    path('<str:pk>/', ConvocatoriaRetrieveUpdateDestroyAPIView.as_view(), name='convocatoria-detail'), #para RetrieveUpdateDestroy
]