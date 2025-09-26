import { useEffect, useState } from "react";
import { ProyectoCard } from "./ProyectoCard";
import { getAllInvestigadores } from "../api/Investigadores.api";

function LiderOptions() {
  const [investigadores,setInvestigadores]=useState([]);

  useEffect(() => {
    async function loadInvestigadores(){
      const ans = await getAllInvestigadores();
      setInvestigadores(ans.data)
    }
    loadInvestigadores();
  });

  return (
    //Retorna de todos los investigadores que obtiene del getall de la api investigadores un option para cada uno
     investigadores.map((investigador)=>{
        <option value={investigador.id}>{investigador.nombre}</option>
     })
  )
}

export default LiderOptions