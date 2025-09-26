from django.urls import path, include
from rest_framework import routers
from apps.Files.api import api

router = routers.DefaultRouter()
router.register(r'addFile', api.FilesViewSet, 'addFile')


urlpatterns = [
    path("", include(router.urls))
]
