import axios from "axios";

// url de la API para las convocatorias
const ConvocatoriaUrl = axios.create({
    baseURL: "http://127.0.0.1:8000/convocatoria",
});

// Obtener todas las convocatorias
export const getAllConvocatorias = async () => {
  const res = await ConvocatoriaUrl.get("/", {withCredentials: true});
  return res.data;
};

// Obtener una convocatoria por ID
export const getConvocatoria = async (id) => {
  const res = await ConvocatoriaUrl.get(`/${id}/`);
  return res.data;
};

// Crear una nueva convocatoria
export const createConvocatoria = async (convocatoria) => {
  const res = await ConvocatoriaUrl.post("/", convocatoria, {withCredentials: true});
  return res.data;
};

// Actualizar una convocatoria existente
export const updateConvocatoria = async (id, convocatoria) => {
  const res = await ConvocatoriaUrl.put(`/${id}/`, convocatoria);
  return res.data;
};

// Eliminar una convocatoria
export const deleteConvocatoria = async (id) => {
  await ConvocatoriaUrl.delete(`/${id}/`);
  return true;
};