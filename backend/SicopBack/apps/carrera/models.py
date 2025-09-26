from django.db import models

# Create your models here.
from django.db import models

class Carrera(models.Model):
    claveCarrera = models.AutoField(primary_key=True)
    nombreCarrera = models.CharField(max_length=120)

    def __str__(self):
        return self.nombreCarrera