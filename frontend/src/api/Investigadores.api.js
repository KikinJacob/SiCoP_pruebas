import axios from "axios";

//TENER CUIDADO CON LA ASIGANCION DE IP EN EL DIRECCIONAMIENTO DE LAS APIS XD
const invUrl = axios.create({
    baseURL: "http:///127.0.0.1:8000/investigador/investigadores"
});

// Obtener todos los investigadores
// export const getAllInvestigadores = async () => {
//   const res = await invUrl.get("/");
//   return res.data;
// };

export const getAllInvestigadores = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/investigador/investigadores/', {
      withCredentials: true 
    });
    return response.data;
  } catch (error) {
    console.error("Error con el servidor al mostrar a los investigadores! : ", error);
    throw error;
  }
};

// Obtener por ID
export const getInvestigador = async (id) => {
  const res = await invUrl.get(`/${id}/`, {withCredentials: true});
  return res.data;
};

// Crear
export const createInvestigador = async (data) => {
  const res = await invUrl.post("/", data, {withCredentials: true});
  return res.data;
};

// Actualizar
export const updateInvestigador = async (id, data) => {
  const res = await invUrl.put(`/${id}/`, data, {withCredentials: true});
  return res.data;
};

// Eliminar
export const deleteInvestigador = async (id) => {
  await invUrl.delete(`/${id}/`);
  return true;
};
