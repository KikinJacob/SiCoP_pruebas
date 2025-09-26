import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/proyecto/proyectos/";

// OBTENER TODOS LOS COLABORADORES
export const getProyectos = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching colaboradores:", error);
    throw error;
  }
};

//OBTENER SOLO UNA CARRERA
export const getProyecto = async (claveInterna) => {
  try {
    const response = await axios.get(`${API_URL}${claveInterna}/`,{
      withCredentials: true  
    });

    return response.data;
  } catch (error) {
    console.error("Error al traer el proyecto: ", error);
    throw error;
  }
}

// CAMBIAR EL ESTADO DEL PROYECTO
export const editEstatusProyecto = async (proyectoId, nuevoEstatus) => {
  try{
    const response = await axios.patch(
      `${API_URL}${proyectoId}/`,
      { estatusProyecto: nuevoEstatus},
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch(error){
    console.error("Error actualizando el estatus del proyecto: ", error);
    throw error;
  }
}
// HABILITAR LA ACCION DE EDITAR EL PROYECTO
export const editActionProyecto = async (proyectoId, nuevoAction) => {
  try {
    const response = await axios.patch(
      `${API_URL}${proyectoId}/`,
      { action: nuevoAction},
      {withCredentials: true}
    );
    return response.data;
  } catch(error){
    console.log("Error actualizando la accion del proyecto: ", error);
    throw error;
  }
}

export const createProyecto = async (data) => {
  try {
    const rfc = Array.isArray(data.empresas) && data.empresas.length > 0
      ? data.empresas[0].rfc
      : "";

    const dataModificada = {
      ...data,
      clave_convocatoria: data.clave_convocatoria,
      rfc: rfc,
      monto: Number(data.monto),
      claveCarrera: data.carrera,
      vinculado: data.estaVinculado,
      metas_input: data.metas
    };

    delete dataModificada.userInfo;
    delete dataModificada.empresas;
    delete dataModificada.convocatoria;

    const response = await axios.post(
      API_URL,
      dataModificada,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error registrar el proyecto:", error.error);
    throw error;
  }
};

export const updateProyecto = async (proyectoId, data) => {
  try {
    // console.log(data);
    const tieneFinanciamiento = data.financiamiento ? "Si" : "No";
    if(tieneFinanciamiento === "No"){
      data.monto = null;
      data.quienFinancia = null;
      data.fechaInicioFinanciamiento = null;
      data.fechaFinFinanciamiento = null;
    }
    const rfc = Array.isArray(data.empresa) && data.empresa.length > 0
      ? data.empresa[0].rfc
      : "";

    const dataModificada = {
      ...data,
      clave_convocatoria: data.convocatoria,
      nombreProyecto: data.nombre,
      rfc: rfc,
      metas_input: data.metasPayload,
      estudiante: data.estudiantesSeleccionados,
      colaboradores: data.colaboradoresSeleccionados,
      areaDesarrolloTec: data.area,
      lineaInvestigacion_LineaPk: data.linea,
      financiamiento: tieneFinanciamiento
    }

    console.log(dataModificada);
    const response = await axios.put(
      `${API_URL}${proyectoId}/`, dataModificada, {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
  if (error.response && error.response.data) {
    console.error("Error al actualizar el proyecto:", error.response.data);
  } else {
    console.error("Error inesperado al actualizar el proyecto:", error.message);
  }
}
}

