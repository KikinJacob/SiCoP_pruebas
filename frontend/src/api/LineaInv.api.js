import axios from "axios";

const API_URL = "http://127.0.0.1:8000/lineainvestigacion/lineas/";

// Obtener todas las líneas de investigación
export const getLineasInv = async () => {
  const res = await axios.get(API_URL, {withCredentials: true});
  return res.data;
};

// Obtener una línea de investigación por ID
export const getLineaInv = async (id) => {
  const res = await axios.get(`${API_URL}${id}/`, {withCredentials: true});
  return res.data;
};

// Crear una nueva línea de investigación
export const createLineaInv = async (data) => {
  const res = await axios.post(API_URL, data, {withCredentials: true});
  return res.data;
};

// Actualizar una línea de investigación existente
export const updateLineaInv = async (id, data) => {
  const res = await axios.put(`${API_URL}${id}/`, data, {withCredentials: true});
  return res.data;
};

// Eliminar una línea de investigación
export const deleteLineaInv = async (id) => {
  await axios.delete(`${API_URL}${id}/`, {withCredentials: true});
  return true;
};