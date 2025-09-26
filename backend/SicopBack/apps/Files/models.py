from django.db import models

# Create your models here.
class doc_file(models.Model):

    #doc = models.FileField(upload_to='formatos/')
    protocolo = models.URLField("URL protocolo")
    informe = models.URLField("URL informe")
    registro = models.URLField("URL registro")
    carta = models.URLField("URL carta de terceros")
    
def __str__(self):
 ##Vizualizador por defecto de un modelo
 return  f'{self.name} {self.last_name}'
