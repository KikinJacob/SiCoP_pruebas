from django.db import models
from apps.investigador.models import Investigador
from apps.proyecto.models import Proyecto

class Colaboradores(models.Model):
    proyecto = models.ForeignKey(
        'proyecto.Proyecto',
        on_delete=models.CASCADE,
        related_name='colaboraciones'
    )
    investigador = models.ForeignKey(
        'investigador.Investigador',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.investigador} en {self.proyecto}"


    def nombre(self):
        return self.investigador.nombre
    
    def apellido(self):
        return self.investigador.apellidos
    
    def curp(self):
        return self.investigador.curp