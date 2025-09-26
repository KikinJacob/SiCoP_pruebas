from django.db import models

# Create your models here.
class BaseModel(models.Model):

    id = models.AutoField(primary_key=True)
    state = models.BooleanField('Estado', default=True)
    add_date = models.DateField('Fecha De Agregacion', auto_now=False, auto_now_add=True)
    modified_date = models.DateField('Fecha De Modificacion', auto_now=True, auto_now_add=False)
    delete_date = models.DateField('Fecha De Eliminacion', auto_now=True, auto_now_add=False)

    

    class Meta:

        abstract = True
        verbose_name = " Modelo Base"
        verbose_name_plural = "Modelos Base"
