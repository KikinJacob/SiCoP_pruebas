import axios from "axios";

const EmpresaUrl = axios.create({
  baseURL: "http://127.0.0.1:8000/empresa/empresas",
});

export const getAllEmpresas = async () =>{
  const data = await EmpresaUrl.get("/", {withCredentials: true});
  return data.data;
}

export const getEmpresas = (id) => EmpresaUrl.get(`/${id}`, {withCredentials: true});

export const createEmpresa = (Empresa) => {
    const res = EmpresaUrl.post("/", Empresa, {withCredentials: true});
    return res;
}

export const deleteEmpresa = (id) => EmpresaUrl.delete(`/${id}`);

export const updateEmpresa = (id, Empresa) =>
  EmpresaUrl.put(`/${id}/`, Empresa);
