"""
URL configuration for SicopBack project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('usuario/', include('apps.users.api.urls')),
    path('Files/', include('apps.Files.api.urls')),
    
    
    #nuevo
    path('carrera/', include('apps.carrera.api.urls')),
    path('colaboradores/', include('apps.colaboradores.api.urls')),
    path('convocatoria/', include('apps.convocatoria.api.urls')),
    path('empresa/', include('apps.empresa.api.urls')),
    path('estudiante/', include('apps.estudiante.api.urls')),
    path('investigador/', include('apps.investigador.api.urls')),
    path('lineainvestigacion/', include('apps.lineainvestigacion.api.urls')),
    path('metas/', include('apps.metas.api.urls')),
    path('credenciales/', include('apps.credenciales.api.urls')),
    path('proyecto/', include('apps.proyecto.api.urls')),
    path('users/api/', include('apps.users.api.urls')),
]