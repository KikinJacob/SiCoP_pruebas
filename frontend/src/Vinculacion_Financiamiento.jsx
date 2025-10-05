import { useForm, Controller } from "react-hook-form"; // <-- Añadido Controller
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Grid,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { getAllConvocatorias } from "./api/Convocatoria.api.js";
import { useRegistroProyecto } from "./components/Context.jsx";
import { createProyecto } from "./api/Proyectos.api.js";

function VinculacionFinanciamiento() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control, // <-- Añadido control
    formState: { errors },
    watch,
  } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [convocatorias, setConvocatorias] = useState([]);
  const tieneFinanciamiento = watch("tieneFinanciamiento");
  const { updateProyecto, proyecto } = useRegistroProyecto();

  const financiadores = [
    { value: "empresa", label: "Empresa" },
    { value: "gobierno", label: "Gobierno" },
    { value: "universidad", label: "Universidad" },
    { value: "otro", label: "Otro" },
  ];

  const onSubmit = async (data) => {
    // Guardar los datos del formulario para usar en la confirmación
    setFormData(data);
    setOpenConfirmModal(true);
  };

  const handleConfirmRegistration = async () => {
    const datosCompletos = {
      ...proyecto,
      ...formData,
      clave_convocatoria: formData.convocatoria,
      financiamiento: formData.tieneFinanciamiento,
    };

    try {
      console.log(formData);
      const response = await createProyecto(datosCompletos);
      localStorage.clear();
      console.log("Proyecto creado exitosamente:", response);
      setOpenConfirmModal(false);
      setOpenModal(true);
    } catch (error) {
      console.error(
        " Error al crear proyecto:",
        error.response ? error.response.data : error.message
      );
      setOpenConfirmModal(false);
    }
  };

  useEffect(() => {
    const fetchConvocatorias = async () => {
      const data = await getAllConvocatorias();
      setConvocatorias(data);
    };
    fetchConvocatorias();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/Proyectos");
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setFormData(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mt: 3 }}>
            Vinculación y Financiamiento
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 3 }}>
            Captura los campos con la información correspondiente, valida la información antes de registrar
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Convocatoria */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Convocatoria</FormLabel>
                  <Select defaultValue="" {...register("convocatoria")}>
                    <MenuItem value="" disabled>
                      Selecciona una convocatoria
                    </MenuItem>
                    {convocatorias.map((c) => (
                      <MenuItem key={c.clave_convocatoria} value={c.clave_convocatoria}>
                        {c.convocatoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Tiene financiamiento (CON CONTROLLER) */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">¿Tiene financiamiento?</FormLabel>
                  <Controller
                    name="tieneFinanciamiento"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Quién financia */}
            {tieneFinanciamiento === "Si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Quién financia"
                      variant="outlined"
                      fullWidth
                      {...register("quienFinancia", { required: true })}
                      error={!!errors.quienFinancia}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {/* Monto */}
            {tieneFinanciamiento === "Si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Monto ($)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...register("monto")}
                  />
                </Grid>
              </Grid>
            )}

            {/* Fechas */}
            {tieneFinanciamiento === "Si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de inicio"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fechaInicioFinanciamiento")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de fin"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fechaFinFinanciamiento")}
                  />
                </Grid>
              </Grid>
            )}

            {/* Botones */}
            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Empresas")}
                  style={{
                    borderColor: "#1B396A",
                    color: "#1B396A",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={(e) => (
                    (e.target.style.backgroundColor = "#1B396A"),
                    (e.target.style.color = "#fff")
                  )}
                  onMouseLeave={(e) => (
                    (e.target.style.backgroundColor = "transparent"),
                    (e.target.style.color = "#1B396A")
                  )}
                >
                  Regresar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#1B396A",
                    color: "#fff",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#162e54")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#1B396A")
                  }
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Modal de Confirmación */}
          <Dialog
            open={openConfirmModal}
            onClose={handleCloseConfirmModal}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "#1B396A",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 60,
                    height: 60,
                  }}
                >
                  <WarningIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Confirmar Registro de Proyecto
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ pt: 3, textAlign: "center" }}>
              <DialogContentText
                sx={{
                  fontSize: "1.1rem",
                  color: "text.primary",
                  mb: 2,
                }}
              >
                ¿Está seguro de que desea registrar este proyecto?
              </DialogContentText>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Una vez registrado, el proyecto será guardado en el sistema y podrá
                ser consultado posteriormente.
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{
                p: 3,
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                onClick={handleCloseConfirmModal}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  borderColor: "#1B396A",
                  color: "#1B396A",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(27, 57, 106, 0.05)",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmRegistration}
                variant="contained"
                autoFocus
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  backgroundColor: "#1B396A",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#153056",
                  },
                }}
              >
                Registrar Proyecto
              </Button>
            </DialogActions>
          </Dialog>

          {/* Modal de Éxito */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "#1B396A",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 60,
                    height: 60,
                  }}
                >
                  <CheckCircleIcon fontSize="large" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  ¡Registro Exitoso!
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ pt: 3, textAlign: "center" }}>
              <DialogContentText
                sx={{ fontSize: "1.1rem", color: "text.primary" }}
              >
                El proyecto ha sido registrado correctamente en el sistema.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, justifyContent: "center" }}>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                autoFocus
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  backgroundColor: "#1B396A",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#153056",
                  },
                }}
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          <Typography variant="body2" align="center" sx={{ mt: 4, color: "#666" }}>
            En caso de que registre un dato mal, podrá modificarlo posteriormente...
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default VinculacionFinanciamiento;
