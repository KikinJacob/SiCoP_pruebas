from django.db import models
#from apps.carrera.models import Carrera  # Asegúrate de que la ruta sea correcta

class LineaInvestigacion(models.Model):
    idLineaInvestigacion = models.CharField(max_length=25, primary_key=True)
    nombre = models.CharField(
        max_length=300,
        error_messages={
            'max_length': 'El nombre no puede exceder 300 caracteres.',
            'blank': 'El nombre es obligatorio.',
        }
    )
    institucionRegistro = models.CharField(
        max_length=100,
        default=None,
        null=True,
        blank=True,
        error_messages={
            'max_length': 'La institución de registro no puede exceder 100 caracteres.'
        }
    )
    claveCarrera = models.ForeignKey(
        'carrera.Carrera',  
        to_field='claveCarrera',
        db_column='claveCarrera',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.nombre