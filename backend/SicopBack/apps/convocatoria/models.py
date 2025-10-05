from django.db import models
from django.core.validators import RegexValidator
from django.forms import ValidationError
from datetime import datetime

class Convocatoria(models.Model):
    clave_convocatoria = models.CharField(
        max_length=13,
        primary_key=True,
        blank=True,
        error_messages={
            'max_length': 'La clave de la convocatoria no puede exceder 13 caracteres.',
            'blank': 'La clave de la convocatoria es obligatoria.',
        }
    )
    convocatoria = models.CharField(
        max_length=200,
        validators=[
            RegexValidator(regex=r'^[\w\s\.\&\-\u00C0-\u00FF?¡!¿:;|@#]+$',
            message='El formato del nombre de la convocatoria no es válido')
        ]
    )
    fechaInicioFinanciamiento = models.DateField(
        auto_now=False, 
        auto_now_add=False
    )
    fechaFinFinanciamiento = models.DateField(
        auto_now=False,
        auto_now_add=False
    )
    institucionFinanciamiento = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        error_messages={
            'max_length': 'La institución de financiamiento no puede exceder 200 caracteres.',
        }
    )
    
    # NUEVOS CAMPOS AGREGADOS
    descripcion = models.TextField(
        max_length=500,
        blank=True, null=True,
        error_messages={
            'max_length': 'La descripción no puede exceder 500 caracteres.',
        }
    )
    presupuesto = models.DecimalField(
        max_digits=12, decimal_places=2,
        blank=True, null=True,
        error_messages={
            'max_digits': 'El presupuesto no puede exceder 12 dígitos.',
            'decimal_places': 'El presupuesto debe tener 2 decimales.',
        }
    )
    fechaInicioConvocatoria = models.DateField(
        auto_now=False,
        auto_now_add=False,
        null=True,
        blank=True
    )
    fechaFinConvocatoria = models.DateField(
        auto_now=False,
        auto_now_add=False,
        null=True,
        blank=True
    )
    requisitos = models.TextField(
        max_length=500,
        blank=True, null=True,
        error_messages={
            'max_length': 'Los requisitos no pueden exceder 500 caracteres.',
        }
    )

    def __str__(self):
        return self.convocatoria
