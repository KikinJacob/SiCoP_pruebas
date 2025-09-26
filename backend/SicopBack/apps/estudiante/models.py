from django.db import models
from apps.carrera.models import Carrera

# Create your models here.
class Estudiante(models.Model):
    noControl = models.CharField(max_length=9, primary_key=True)
    nombre = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=90)
    correo = models.CharField(max_length=100)
    telefono = models.CharField(max_length=10)
    semestre = models.CharField(max_length=90)
    claveCarrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='claveCarrera')
    
    def __str__(self):
        return f"{self.noControl} - {self.nombre} {self.apellidos}"