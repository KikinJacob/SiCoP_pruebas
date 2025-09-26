import { ThreeMpOutlined } from '@mui/icons-material';
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/metas/metas/";

export const getMetas = async () => {
    try {
        const response = await axios.get(API_URL, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos: ", error.error);
        throw error;
    }
}