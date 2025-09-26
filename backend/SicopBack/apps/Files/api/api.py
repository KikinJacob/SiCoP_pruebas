
from  apps.Files.models import doc_file
from rest_framework import viewsets, permissions
from .serializers import FileSerializers


class FilesViewSet(viewsets.ModelViewSet):
    queryset= doc_file.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FileSerializers