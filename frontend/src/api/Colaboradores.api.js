import axios from "axios";

const API_URL = "http://127.0.0.1:8000/colaboradores/";

// OBTENER TODOS LOS COLABORADORES
export const getColaboradores = async () => {
  try {
    const response = await axios.get(API_URL,{
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching colaboradores:", error);
    throw error;
  }
};

export const addColaboradores = async () => {
    try{

    } catch(error){
        console.log("Error al agregar al colaborador: ", error);
        throw error;
    }
};