import { useForm, Controller } from "react-hook-form";
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
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
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
  const [openCancelModal, setOpenCancelModal] = useState(false);
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

  const handleRegresar = () => {
    setOpenCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setOpenCancelModal(false);
    navigate("/Empresas");
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
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
                  onClick={handleRegresar}
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
            maxWidth="xs"
            fullWidth
            sx={{ zIndex: 2100 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                width: '350px',
                maxHeight: '400px'
              }
            }}
          >
            <DialogTitle sx={{
              textAlign: 'center',
              p: 2,
              backgroundColor: '#1B396A',
              color: 'white',
              fontWeight: 'bold',
              position: 'relative'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
              }}>
                <Avatar sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  width: 45,
                  height: 45
                }}>
                  <CheckCircleIcon fontSize="medium" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                  Confirmar Registro
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{
              pt: '60px',
              pb: 2,
              textAlign: 'center',
              backgroundColor: 'white',
              px: 3
            }}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2, color: '#1B396A', fontWeight: 'bold' }}>
                ¿Está seguro de registrar el proyecto?
              </Typography>
              <DialogContentText sx={{
                fontSize: '0.85rem',
                color: 'text.primary',
                lineHeight: 1.3
              }}>
                Esta acción creará un nuevo proyecto en el sistema.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
              p: 2.5,
              justifyContent: 'center',
              gap: 2,
              backgroundColor: 'white'
            }}>
              <Button
                onClick={handleCloseConfirmModal}
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  borderColor: '#1B396A',
                  color: '#1B396A',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: 'rgba(27, 57, 106, 0.05)',
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmRegistration}
                variant="contained"
                autoFocus
                size="medium"
                startIcon={<SaveIcon fontSize="small" />}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  backgroundColor: '#1B396A',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: '#153056',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(27, 57, 106, 0.3)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Registrar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Modal de Éxito */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="xs"
            fullWidth
            sx={{ zIndex: 2100 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                width: '350px',
                maxHeight: '400px'
              }
            }}
          >
            <DialogTitle sx={{
              textAlign: 'center',
              p: 2,
              backgroundColor: '#1B396A',
              color: 'white',
              fontWeight: 'bold',
              position: 'relative'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
              }}>
                <Avatar sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  width: 45,
                  height: 45
                }}>
                  <CheckCircleIcon fontSize="medium" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                  ¡Registro Exitoso!
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{
              pt: '60px',
              pb: 2,
              textAlign: 'center',
              backgroundColor: 'white',
              px: 3
            }}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2, color: '#1B396A', fontWeight: 'bold' }}>
                El proyecto ha sido registrado correctamente en el sistema.
              </Typography>
            </DialogContent>
            <DialogActions sx={{
              p: 2.5,
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                autoFocus
                size="medium"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  backgroundColor: '#1B396A',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  '&:hover': {
                    backgroundColor: '#153056',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(27, 57, 106, 0.3)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Modal de Cancelación */}
          <Dialog
            open={openCancelModal}
            onClose={handleCloseCancelModal}
            maxWidth="xs"
            fullWidth
            sx={{ zIndex: 2100 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                width: '350px',
                maxHeight: '400px'
              }
            }}
          >
            <DialogTitle sx={{
              textAlign: 'center',
              p: 2,
              backgroundColor: '#1B396A',
              color: 'white',
              fontWeight: 'bold',
              position: 'relative'
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
              }}>
                <Avatar sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  width: 45,
                  height: 45
                }}>
                  <WarningIcon fontSize="medium" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                  Cancelar Registro
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{
              pt: '60px',
              pb: 2,
              textAlign: 'center',
              backgroundColor: 'white',
              px: 3
            }}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
                ¿Desea salir sin guardar?
              </Typography>
              <DialogContentText sx={{
                fontSize: '0.85rem',
                color: 'text.primary',
                lineHeight: 1.3
              }}>
                Los datos ingresados se perderán si no se guardan.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
              p: 2.5,
              justifyContent: 'center',
              gap: 2,
              backgroundColor: 'white'
            }}>
              <Button
                onClick={handleCloseCancelModal}
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  borderColor: '#1B396A',
                  color: '#1B396A',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  minWidth: '110px',
                  '&:hover': {
                    backgroundColor: 'rgba(27, 57, 106, 0.05)',
                  }
                }}
              >
                Continuar
              </Button>
              <Button
                onClick={handleConfirmCancel}
                variant="contained"
                autoFocus
                size="medium"
                startIcon={<CloseIcon fontSize="small" />}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  minWidth: '110px',
                  '&:hover': {
                    backgroundColor: '#c62828',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Salir
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
