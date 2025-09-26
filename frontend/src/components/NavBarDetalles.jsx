import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function DetallesProyecto() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navBar navbar-expand-lg bg-light">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <button
              className="nav-link link-dark"
              onClick={() => navigate(`/Detalles/General`)}
            >
              <p className="fs-4">Datos Generales</p>
            </button>
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="#"
              onClick={() => navigate(`/Detalles/Investigadores`)}
            >
              <p className="fs-4">Datos Investigadores </p>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="#"
              onClick={() => navigate(`/Detalles/Alumnos`)}
            >
              <p className="fs-4">Datos Alumnos</p>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="#"
              onClick={() => navigate(`/Detalles/Institucion`)}
            >
              <p className="fs-4">Datos Institucion</p>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="#"
              onClick={() => navigate(`/Detalles/Metas`)}
            >
              <p className="fs-4">Metas Existentes</p>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-dark"
              href="#"
              onClick={() => navigate(`/Detalles/Archivos`)}
            >
              <p className="fs-4">Documentos</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
