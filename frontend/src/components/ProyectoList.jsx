import { useEffect, useState } from "react";
import { ProyectoCard } from "./ProyectoCard";
import { getAllProyects } from "../api/proyecto.api";
import { Typography } from "@mui/material";

function ProyectoList() {
  const [proyectos, setProyecto] = useState([]);

  useEffect(() => {
    async function loadProyects() {
      const ans = await getAllProyects();
      setProyecto(ans.data);
    }
    loadProyects();
  });

  return (
    <div className="grid grid-cols-3 gap-3">
      {proyectos.length > 0 ? (
        proyectos.map((proyecto) => (
          <ProyectoCard key={proyecto.id} proyecto={proyecto} />
        ))
      ) : (
        <div
          class="container d-flex justify-content-center align-items-center"
          
        >
          <div class="p-3">
            <Typography variant="h5" color={"GrayText"}>Aun no cuentas con proyectos</Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProyectoList;
