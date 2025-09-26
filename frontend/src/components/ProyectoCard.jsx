import React from "react";
import { useNavigate } from "react-router-dom";

export function ProyectoCard({proyecto}) {
  const navigate = useNavigate ()

  return (
    <div class="card text-end" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{proyecto.name}</h5>
        <p class="card-text">
          {proyecto.lider}
        </p>
        <a onClick={() => navigate(`/proyecto/${proyecto.name}/`)} class="btn btn-primary">
          Ver detalles
        </a>
      </div>
    </div>
  );
}

