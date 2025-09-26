import { useEffect, useState } from "react";
import { ProyectoCard } from "./ProyectoCard";
import { getAllInvestigadores } from "../api/Investigadores.api.js";

function LineaInvestigacion() {
  const [investigacion,setInvestigaacion]=useState([]);

  useEffect(() => {
    async function loadInvestigacion(){
      const ans = await getAllInvestigadores();
      setInvestigaacion(ans.data)
    }
    loadInvestigacion();
  });

  return (
    //Retorna de todos los investigadores que obtiene del getall de la api investigadores un option para cada uno
     investigacion.map((invest)=>{
        <option value={invest.id}>{invest.nombre}</option>
     })
  )
}

export default LineaInvestigacion