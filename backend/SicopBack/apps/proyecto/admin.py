# apps/proyecto/admin.py
from django.contrib import admin
from .models import Proyecto, MetaProyecto

class MetaProyectoInline(admin.TabularInline):
    model = MetaProyecto
    extra = 1

@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    inlines = [MetaProyectoInline]
