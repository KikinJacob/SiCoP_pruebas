import React, { useEffect, useState } from "react";
import {
  Grid,
  CssBaseline,
  Typography,
  Modal,
  Box,
  Card,
  CardContent,
  IconButton,
  Fade,
  Backdrop,
  Chip,
  Divider,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import ConvocatoriasCard from "../components/ConvocatoriasCard";
import SideBar from "../components/SideBar";
import { getAllConvocatorias } from "../api/Convocatoria.api";

export default function ConvocatoriasInvestigador({ user = { type: "Investigador" } }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);

  useEffect(() => {
    try {
      const fetchConvocatorias = async () => {
        const data = await getAllConvocatorias();
        console.log(data);
      }

      fetchConvocatorias();
    } catch (error) {
      console.error("Error al cargar las convocatorias: ", error);
      throw error;
    }
  }, [])

  // Datos de ejemplo para las convocatorias
  const convocatorias = [
    {
      id: 1,
      titulo: "Convocatoria de Investigación Científica 2024",
      fechaInicio: "2024-01-15",
      fechaFin: "2024-03-30",
      presupuesto: "$500,000 MXN",
      descripcion: "Convocatoria dirigida a proyectos de investigación científica que contribuyan al desarrollo tecnológico y la innovación en el ámbito académico.",
      requisitos: ["Ser investigador activo", "Tener grado de doctorado", "Presentar propuesta detallada"],
      areas: ["Tecnología", "Ciencias Exactas", "Innovación"],
      estado: "Activa"
    },
    {
      id: 2,
      titulo: "Fondos para Proyectos de Innovación",
      fechaInicio: "2024-02-01",
      fechaFin: "2024-04-15",
      presupuesto: "$300,000 MXN",
      descripcion: "Apoyo financiero para proyectos innovadores que generen impacto social y económico en la región.",
      requisitos: ["Propuesta viable", "Equipo multidisciplinario", "Plan de desarrollo"],
      areas: ["Innovación", "Desarrollo Social", "Tecnología"],
      estado: "Activa"
    },
    {
      id: 3,
      titulo: "Convocatoria Internacional de Colaboración",
      fechaInicio: "2024-03-01",
      fechaFin: "2024-05-30",
      presupuesto: "$750,000 MXN",
      descripcion: "Programa de colaboración internacional para el intercambio académico y desarrollo de proyectos conjuntos.",
      requisitos: ["Colaboración internacional", "Experiencia comprobada", "Propuesta conjunta"],
      areas: ["Colaboración", "Investigación", "Internacionalización"],
      estado: "Próximamente"
    },
    {
      id: 4,
      titulo: "Apoyo a Jóvenes Investigadores",
      fechaInicio: "2024-04-01",
      fechaFin: "2024-06-15",
      presupuesto: "$200,000 MXN",
      descripcion: "Programa especial de apoyo para jóvenes investigadores que buscan desarrollar sus primeros proyectos independientes.",
      requisitos: ["Menor de 35 años", "Grado de maestría mínimo", "Primera investigación independiente"],
      areas: ["Formación", "Investigación", "Desarrollo Profesional"],
      estado: "Activa"
    },
    {
      id: 5,
      titulo: "Convocatoria de Sustentabilidad",
      fechaInicio: "2024-05-01",
      fechaFin: "2024-07-30",
      presupuesto: "$400,000 MXN",
      descripcion: "Proyectos enfocados en la sustentabilidad ambiental y el desarrollo de tecnologías verdes.",
      requisitos: ["Enfoque ambiental", "Impacto medible", "Viabilidad técnica"],
      areas: ["Sustentabilidad", "Medio Ambiente", "Tecnología Verde"],
      estado: "Activa"
    },
    {
      id: 6,
      titulo: "Fondo de Emergencia COVID-19",
      fechaInicio: "2024-01-01",
      fechaFin: "2024-12-31",
      presupuesto: "$1,000,000 MXN",
      descripcion: "Apoyo especial para investigaciones relacionadas con la pandemia y sus efectos sociales y económicos.",
      requisitos: ["Relación con COVID-19", "Urgencia justificada", "Impacto social"],
      areas: ["Salud", "Investigación Médica", "Impacto Social"],
      estado: "Cerrada"
    }
  ];

  const handleOpenModal = (convocatoria) => {
    setSelectedConvocatoria(convocatoria);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedConvocatoria(null);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Activa":
        return "success";
      case "Próximamente":
        return "warning";
      case "Cerrada":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div className="mx-auto text-center" style={{ minHeight: "100vh", width: "100%" }}>
      <CssBaseline />
      {user && user.type === "Investigador" && (
        <nav>
          <SideBar />
        </nav>
      )}
      <div
        className="text-center"
        style={
          user && user.type === "Investigador"
            ? { paddingTop: "50px", marginLeft: "80px" }
            : { paddingTop: "50px" }
        }
      >
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Convocatorias
        </Typography>
        <p>
          Conoce las diversas convocatorias activas, en las que puedes
          participar para superarte a ti mismo, ayudando a transformar e innovar
          nuestra comunidad
        </p>
        <Grid
          container
          spacing={3}
          style={{ padding: 30, justifyContent: "center" }}
        >
          {convocatorias.map((convocatoria) => (
            <Grid item xs={12} sm={6} md={4} key={convocatoria.id}>
              <ConvocatoriasCard
                convocatoria={{
                  convocatoria: convocatoria.titulo,
                  fechaInicioFinanciamiento: convocatoria.fechaInicio,
                  fechaFinanciamiento: convocatoria.fechaFin
                }}
                onClick={() => handleOpenModal(convocatoria)}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Modal con animación para mostrar detalles de la convocatoria */}
      <Modal
        aria-labelledby="convocatoria-modal-title"
        aria-describedby="convocatoria-modal-description"
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }
        }}
      >
        <Fade in={modalOpen} timeout={500}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "70%" },
              maxWidth: 800,
              maxHeight: "90vh",
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              animation: "slideIn 0.5s ease-out",
              "@keyframes slideIn": {
                "0%": {
                  opacity: 0,
                  transform: "translate(-50%, -60%) scale(0.8)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translate(-50%, -50%) scale(1)",
                },
              },
            }}
          >
            {selectedConvocatoria && (
              <Card elevation={0} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Header del modal */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Typography
                        id="convocatoria-modal-title"
                        variant="h4"
                        component="h2"
                        sx={{
                          fontWeight: "bold",
                          color: "primary.main",
                          mb: 1,
                          lineHeight: 1.3
                        }}
                      >
                        {selectedConvocatoria.titulo}
                      </Typography>
                      <Chip
                        label={selectedConvocatoria.estado}
                        color={getEstadoColor(selectedConvocatoria.estado)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>
                    <IconButton
                      aria-label="cerrar"
                      onClick={handleCloseModal}
                      sx={{
                        color: "grey.500",
                        "&:hover": {
                          backgroundColor: "grey.100",
                          transform: "scale(1.1)"
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Información principal */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <CalendarTodayIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                          Fechas importantes
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Inicio:</strong> {selectedConvocatoria.fechaInicio}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Cierre:</strong> {selectedConvocatoria.fechaFin}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <AttachMoneyIcon sx={{ mr: 1, color: "success.main" }} />
                        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                          Presupuesto
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ color: "success.main", fontWeight: "bold" }}>
                        {selectedConvocatoria.presupuesto}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ mb: 3 }} />

                  {/* Descripción */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <DescriptionIcon sx={{ mr: 1, color: "info.main" }} />
                      <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                        Descripción
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.6,
                        textAlign: "justify",
                        color: "text.secondary"
                      }}
                    >
                      {selectedConvocatoria.descripcion}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Áreas de investigación */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                      Áreas de investigación
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {selectedConvocatoria.areas.map((area, index) => (
                        <Chip
                          key={index}
                          label={area}
                          variant="outlined"
                          color="primary"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Requisitos */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                      Requisitos principales
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {selectedConvocatoria.requisitos.map((requisito, index) => (
                        <Typography
                          component="li"
                          key={index}
                          variant="body1"
                          sx={{ mb: 1, color: "text.secondary" }}
                        >
                          {requisito}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Botones de acción */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCloseModal}
                      sx={{ borderRadius: 2 }}
                    >
                      Cerrar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={selectedConvocatoria.estado === "Cerrada"}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow: 6
                        },
                        transition: "all 0.2s ease"
                      }}
                    >
                      {selectedConvocatoria.estado === "Cerrada" ? "Convocatoria Cerrada" : "Aplicar Ahora"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}