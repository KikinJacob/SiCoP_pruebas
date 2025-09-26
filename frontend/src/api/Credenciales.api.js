import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/credenciales/";

export const doLogin = async (usuario, password) => {
  try {
    const response = await axios.post(API_URL + "login/", {
      username: usuario,
      password: password
    }, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error en doLogin:", error.response?.data || error.message);
    return null;
  }
};

export const chechSession = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/credenciales/check-auth/",{
            withCredentials: true
        });
        return response.data.authenticated;
    } catch (error) {
        return false;
    }
};

export const checkRol = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/credenciales/rol/", {
      withCredentials: true
    });
    return response.data
  } catch (error) {
    return error;
  }
}
export const logOut = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/credenciales/logout/",
      {}, 
      { withCredentials: true } // configuración
    );
    return response.data;
  } catch (error) {
    return error;
  }
}