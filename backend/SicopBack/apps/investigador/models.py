from django.db import models
from apps.carrera.models import Carrera
from apps.credenciales.models import Credenciales
from django.conf import settings

# Create your models here.
class Investigador(models.Model):
    curp = models.CharField(max_length=18, primary_key=True)
    nombre = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=90)
    correo = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True)
    claveCarrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='claveCarrera')
    id_Credencial = models.ForeignKey(Credenciales, on_delete=models.CASCADE, db_column='id_Credencial', null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)

        # Sobrescribir el método save
    def save(self, *args, **kwargs):
        # Verificar si el correo ha cambiado
        if self.pk:  # Solo si el objeto ya existe
            old_instance = Investigador.objects.filter(pk=self.pk).first()
            if old_instance and old_instance.correo != self.correo:
                # Actualizar el correo del usuario asociado
                if self.user:
                    self.user.username = self.correo
                    self.user.email = self.correo
                    self.user.save()

                # Opcional: Actualizar credenciales si es necesario
                if self.id_Credencial:
                    self.id_Credencial.user = self.user
                    self.id_Credencial.save()

        # Guardar el investigador
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.nombre} {self.apellidos} ({self.curp})"