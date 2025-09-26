from django.db import models
from django.core.validators import RegexValidator

class Empresa(models.Model):
    rfc = models.CharField(
        max_length=13,
        primary_key=True,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{2}[A\d])?$',
                message='El formato del RFC no es válido'
            )
        ]
    )
    razonSocial = models.CharField(
        max_length=300,
        error_messages={
            'max_length': 'La razón social no puede exceder 300 caracteres.',
            'blank': 'La razón social es obligatoria.',
        }
    )
    SECTOR_CHOICES = [
        ('Publico', 'Público'),
        ('Privado', 'Privado'),
    ]
    sector = models.CharField(max_length=8, choices=SECTOR_CHOICES)
    tipoEmpresa = models.CharField(
        max_length=100,
        error_messages={
            'max_length': 'El tipo de empresa no puede exceder 100 caracteres.',
            'blank': 'El tipo de empresa es obligatorio.',
        }
    )

    def __str__(self):
        return self.razonSocial