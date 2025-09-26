import axios from "axios";

const API_URL = "http://127.0.0.1:8000/carrera/carreras/";

// Obtener todas las carreras
export const getCarreras = async () => {
  const res = await axios.get(API_URL, {withCredentials: true});
  return res.data;
};

// Crear una nueva carrera
export const createCarrera = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// Actualizar una carrera existente
export const updateCarrera = async (id, data) => {
  const res = await axios.put(`${API_URL}${id}/`, data);
  return res.data;
};

// Eliminar una carrera
export const deleteCarrera = async (id) => {
  await axios.delete(`${API_URL}${id}/`);
  return true;
};
