import { Grid, CssBaseline, Typography, Box, IconButton } from "@mui/material";
import ConvocatoriasCard from "../../components/ConvocatoriasCard";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import SideBarAdmin from "../../components/SideBarAdmin";
import React from "react";
import { getAllConvocatorias } from "../../api/Convocatoria.api";
import { chechSession, checkRol } from "../../api/Credenciales.api";
import Slider from "react-slick";

export default function Convocatorias({ user = { type: "Admin" } }) {
  const navigate = useNavigate();
  const [convocatorias, setConvocatorias] = React.useState([]);

  // Cargar las convocatorias al montar el componente
  React.useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const isLoggedIn = await chechSession();
        const rol = await checkRol();

        if (!isLoggedIn || rol.Rol !== "Administrador") {
          navigate("/");
          return;
        }
        const data = await getAllConvocatorias();
        setConvocatorias(data);
        console.log("Convocatorias:", data);
      } catch (error) {
        console.error("Error fetching convocatorias:", error);
      }
    };

    fetchConvocatorias();
  }, []);

  // Configuración del slider
  const slidesToShow = Math.min(3, convocatorias.length || 1);
  const slidesToScroll = Math.min(3, convocatorias.length || 1);

  const settings = {
    dots: true,
    infinite: convocatorias.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: Math.min(2, convocatorias.length || 1), slidesToScroll: Math.min(2, convocatorias.length || 1) } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', justifyContent: 'center' }}>
      <CssBaseline />
      {user && user.type === "Admin" && (
        <nav>
          <SideBarAdmin />
        </nav>
      )}
      <Box sx={{ flex: 1, padding: "20px", mt: 7, mb: 7, overflowX: "hidden" }}>
        <Typography variant="h3" align="center" style={{ marginTop: "20px" }}>
          Convocatorias
        </Typography>
        <Box sx={{ textAlign: "center", mb: "20px", mt: "20px" }}>
          {user && user.type === "Admin" && (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate(`/Administracion/RegistroConvocatorias`)}
            >
              Registrar Convocatoria
            </button>
          )}
          <p>
            Conoce las diversas convocatorias activas, en las que puedes
            participar para superarte a ti mismo, ayudando a transformar e innovar
            nuestra comunidad
          </p>
        </Box>
        {/* SLIDER DE CONVOCATORIAS */}
        <div style={{ padding: "20px", marginRight: "5px" }}>
          <Slider {...settings}>
            {convocatorias.length === 0 ? (
              <div>
                <Typography variant="body1">No hay convocatorias disponibles.</Typography>
              </div>
            ) : (
              convocatorias.map((convocatoria, idx) => (
                <div
                  key={convocatoria.clave_convocatoria || idx}
                >
                  <ConvocatoriasCard convocatoria={convocatoria} />
                </div>
              ))
            )}
          </Slider>
        </div>
      </Box>
    </Box>
  );
}