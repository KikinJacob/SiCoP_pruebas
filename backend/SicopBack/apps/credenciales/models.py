from django.db import models
from django.conf import settings

# Create your models here.
class Credenciales(models.Model):
    ADMINISTRADOR = 'Administrador'
    INVESTIGADOR = 'Investigador'
    ROLES = [
        (ADMINISTRADOR, 'Administrador'),
        (INVESTIGADOR, 'Investigador'),
    ]
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='credencial',
        null=True,
        blank=True
    )

    id_Credencial = models.AutoField(primary_key=True)
    # usuario = models.CharField(max_length=100)
    # contraseña = models.CharField(max_length=256)
    Rol = models.CharField(max_length=13, choices=ROLES)

    def __str__(self):
        return self.user.username if self.user else f"Credencial {self.id_Credencial}"
