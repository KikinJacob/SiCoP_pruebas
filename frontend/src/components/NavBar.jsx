import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { logOut, checkRol } from "../api/Credenciales.api.js";

export default function NavBar({ user }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logout = await logOut();
      if (logout) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // FUNCION PARA EL MANEJO DEL CLICK DEL LOGO A LA PAGINA DE INICIO
  const handleMove = async () => {
    try {
      const rol = await checkRol();
      if(rol.Rol === "Administrador"){
        navigate("/Administracion/Proyectos");
      } else {
        navigate("/Proyectos");
      }
    } catch (error) {
      console.error("Error al identificar el rol del usuario: ", error);
    }
  }

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#1B396A",
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 1300
      }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand bold" to="#" onClick={handleMove}>
          <p className="fs-3 bold m-0">SiCoP</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user ? user.name : "Juan Perez"}
            </a>
            <ul className="dropdown-menu">
              <li>
                {!user ? 
                <div>
                  <Link className="dropdown-item" to={"/NoTerminada"}>Mi perfil</Link>
                  <Link className="dropdown-item" to={"/Proyectos"}>Mis proyectos</Link>
                </div> : ""}
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}