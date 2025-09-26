from rest_framework import serializers
from apps.Files.models import doc_file


class FileSerializers(serializers.ModelSerializer):
    class Meta:
        model = doc_file
        fields = '__all__'