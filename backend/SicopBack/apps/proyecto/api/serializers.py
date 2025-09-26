from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
# from apps.carrera.models import Carrera
from apps.proyecto.models import Proyecto, MetaProyecto
from apps.lineainvestigacion.models import LineaInvestigacion
from apps.estudiante.models import Estudiante
from apps.investigador.models import Investigador
from apps.convocatoria.models import Convocatoria
from apps.empresa.models import Empresa

# 🔹 Serializadores básicos
class EstudianteSerializer(serializers.ModelSerializer):
    carrera = serializers.SerializerMethodField()

    class Meta:
        model = Estudiante
        fields = ['noControl', 'nombre', 'apellidos', 'claveCarrera', 'semestre', 'carrera', 'telefono', 'correo']

    def get_carrera(self, obj):
        try:
            return obj.claveCarrera.nombreCarrera 
        except AttributeError:
            return None

class InvestigadorSerializer(serializers.ModelSerializer):
    carrera = serializers.SerializerMethodField()

    class Meta:
        model = Investigador
        fields = ['curp', 'nombre', 'apellidos', 'correo', 'carrera']

    def get_carrera(self, obj):
        try:
            return obj.claveCarrera.nombreCarrera 
        except AttributeError:
            return None


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ['rfc', 'razonSocial', 'sector', 'tipoEmpresa']

class ConvocatoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convocatoria
        fields = ['clave_convocatoria', 'convocatoria']

# 🔹 Serializer resumido para lista
class ProyectoResumenSerializer(serializers.ModelSerializer):
    linea_investigacion_nombre = serializers.CharField(source="lineaInvestigacion_LineaPk.nombre", read_only=True)
    empresa_nombre = serializers.CharField(source="rfc.razonSocial", read_only=True)

    class Meta:
        model = Proyecto
        fields = ['claveInterna', 'nombreProyecto', 'empresa_nombre', 'linea_investigacion_nombre', 'liderProyecto', 'estatusProyecto', 'action']

#  Serializer para detalle (GET /proyectos/<id>/)
class ProyectoDetalleSerializer(serializers.ModelSerializer):
    convocatoria = ConvocatoriaSerializer(source="clave_convocatoria", read_only=True)
    rfc = EmpresaSerializer(read_only=True)
    lineaInvestigacion_LineaPk = serializers.StringRelatedField()
    liderProyecto = InvestigadorSerializer(read_only=True)
    colaboradores = InvestigadorSerializer(many=True, read_only=True)
    estudiante = EstudianteSerializer(many=True, read_only=True)
    metas = SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = '__all__'

    def get_metas(self, obj):
        metas_data = []
        for relacion in MetaProyecto.objects.filter(proyecto=obj):
            metas_data.append({
                "id": relacion.meta.idMeta,  
                "nombre": relacion.meta.nombre,
                "cantidad": relacion.cantidad
            })
        return metas_data

# 🔹 Serializer para registro (POST/PUT)
class ProyectoRegistroSerializer(serializers.ModelSerializer):
    convocatoria_rfc = serializers.CharField(source="rfc_convocatoria.rfc", read_only=True)
    empresa_nombre = serializers.CharField(source="rfc.razonSocial", read_only=True)
    linea_investigacion_nombre = serializers.CharField(source="lineaInvestigacion_LineaPk.nombre", read_only=True)

    clave_convocatoria = serializers.SlugRelatedField(
        slug_field='clave_convocatoria',
        queryset=Convocatoria.objects.all(),
        write_only=True
    )
    convocatoria = serializers.SerializerMethodField()

    estudiante = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Estudiante.objects.all(), required=False
    )

    colaboradores = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Investigador.objects.all(), required=False
    )

    metas_input = serializers.ListField(
        child=serializers.DictField(), write_only=True, required=False
    )

    metas = SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = '__all__'

    def get_convocatoria(self, obj):
        return ConvocatoriaSerializer(obj.clave_convocatoria).data if obj.clave_convocatoria else None

    def create(self, validated_data):
        estudiantes = validated_data.pop('estudiante', [])
        colaboradores = validated_data.pop('colaboradores', [])
        metas_data = validated_data.pop('metas_input', [])

        proyecto = Proyecto.objects.create(**validated_data)
        proyecto.estudiante.set(estudiantes)
        proyecto.colaboradores.set(colaboradores)

        for meta_info in metas_data:
            meta_id = meta_info.get("id")
            cantidad = meta_info.get("cantidad", 0)
            if meta_id is not None:
                MetaProyecto.objects.create(
                    proyecto=proyecto,
                    meta_id=meta_id,
                    cantidad=cantidad
                )
        return proyecto

    def update(self, instance, validated_data):
        estudiantes = validated_data.pop('estudiante', [])
        colaboradores = validated_data.pop('colaboradores', [])
        metas_data = validated_data.pop('metas_input', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if estudiantes:
            instance.estudiante.set(estudiantes)
        if colaboradores:
            instance.colaboradores.set(colaboradores)

        if metas_data:
            metas_ids = [meta['id'] for meta in metas_data if 'id' in meta]
            MetaProyecto.objects.filter(proyecto=instance).exclude(meta_id__in=metas_ids).delete()

            for meta_info in metas_data:
                meta_id = meta_info.get("id")
                cantidad = meta_info.get("cantidad", 0)
                if meta_id is not None:
                    MetaProyecto.objects.update_or_create(
                        proyecto=instance,
                        meta_id=meta_id,
                        defaults={'cantidad': cantidad}
                    )
        return instance

    def get_metas(self, obj):
        metas_data = []
        for relacion in MetaProyecto.objects.filter(proyecto=obj):
            metas_data.append({
                "id": relacion.meta.idMeta,  
                "nombre": relacion.meta.nombre,
                "cantidad": relacion.cantidad
            })
        return metas_data
