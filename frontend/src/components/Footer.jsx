import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1B396A",
        color: "white",
        textAlign: "center",
        padding: "1rem",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60px",
        zIndex: 1300 
      }}
    >
      <p style={{ margin: 0 }}>&copy; 2024 SiCoP. Todos los derechos reservados.</p>
    </footer>
  );
}