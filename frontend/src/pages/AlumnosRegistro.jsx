import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { createEstudiante } from "../api/Estudiante.api.js";
import { getCarreras } from "../api/carrera.api";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  Grid,
  styled,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from "@mui/material";
import Footer from "../components/Footer";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

// styles Select
const CustomSelect = styled(Select)(({ error }) => ({
  "& .MuiSelect-icon": {
    right: error ? 40 : 10,
  },
  "& .MuiInputAdornment-root": {
    marginRight: error ? 0 : -20,
  },
}));

function AlumnosRegistro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [carreras, setCarreras] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingCarreras, setLoadingCarreras] = useState(true);
  const location = useLocation();
  const estudiante = location.state?.estudiante || null;
  const editar = Boolean(estudiante);

  const onSubmit = async (data) => {
    console.log("Formulario enviado con datos:", data);
    console.log("Nombre completo a mostrar:", `${data.nombre} ${data.apellidos}`);
    setFormData(data);
    setOpenConfirmModal(true);
  };

  const handleConfirmRegistration = async () => {
    console.log("Confirmando registro con datos:", formData);
    try {
      const res = await createEstudiante(formData);
      console.log("Estudiante registrado exitosamente:", res);
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);
      // Limpiar el formulario después del registro exitoso
      reset();
      setFormData(null);
    } catch (error) {
      console.error("Error al registrar estudiante:", error);
      setOpenConfirmModal(false);
      // Mostrar modal de error en lugar de alert
      setErrorMessage("Error al registrar el estudiante. Por favor, intenta de nuevo.");
      setOpenErrorModal(true);
    }
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
    navigate(-1);
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate(-1);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    setErrorMessage("");
  };

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        console.log("🔄 Iniciando carga de carreras...");
        setLoadingCarreras(true);
        const data = await getCarreras();
        console.log("✅ Carreras cargadas:", data);
        console.log("📊 Número de carreras:", data.length);
        setCarreras(data);
      } catch (error) {
        console.error("❌ Error al traer los datos: ", error);
        setCarreras([]); // Asegurar que se establezca un array vacío en caso de error
      } finally {
        setLoadingCarreras(false);
      }
    }

    // Ejecutar la función para obtener las carreras
    fetchCarreras();

    if (editar) {
      reset({
        nombre: estudiante.nombre,
        apellidos: estudiante.apellidos,
        noControl: estudiante.noControl,
        claveCarrera: estudiante.claveCarrera,
        telefono: estudiante.telefono,
        semestre: estudiante.semestre,
        correo: estudiante.correo,
      });
    }
  }, [editar, estudiante, reset]);

  // console.log("estudiante: ",estudiante);
  console.log("🏫 Estado actual de carreras:", carreras);
  console.log("📈 Carreras length:", carreras.length);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de estudiante
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la
            información antes de registrar
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NOMBRE Y APELLIDOS */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputNombre" className="col-form-label">
                  Nombre
                </label>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  {...register("nombre", {
                    required: true,
                    pattern: /[a-zA-Z\s]*/,
                  })}
                  error={!!errors.nombre}
                  InputProps={{
                    endAdornment: errors.nombre ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputApellidos" className="col-form-label">
                  Apellidos
                </label>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  {...register("apellidos", {
                    required: true,
                    pattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/,
                  })}
                  error={!!errors.apellidos}
                  InputProps={{
                    endAdornment: errors.apellidos ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
            </Grid>

            {/* NUMERO DE CONTROL Y CARRERA */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">No. Control</label>
                <TextField
                  label="No. Control"
                  variant="outlined"
                  fullWidth
                  inputProps={{ minLength: 9, maxLength: 9 }}
                  {...register("noControl", {
                    required: true,
                    pattern: /[SDACEGMT]{1}[0-9]{2}(120){1}[0-9]{3}/,
                  })}
                  error={!!errors.noControl}
                  InputProps={{
                    endAdornment: errors.noControl ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.career}>
                  <InputLabel>Carrera</InputLabel>
                  <CustomSelect
                    label="Carrera"
                    defaultValue=""
                    {...register("claveCarrera", { required: true })}
                    error={!!errors.claveCarrera}
                    disabled={loadingCarreras}
                    endAdornment={
                      errors.claveCarrera ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="">
                      <em>{loadingCarreras ? "Cargando carreras..." : "Selecciona una carrera"}</em>
                    </MenuItem>
                    {!loadingCarreras && carreras.map((carrera) => {
                      console.log("🎓 Renderizando carrera:", carrera);
                      return (
                        <MenuItem key={carrera.claveCarrera} value={carrera.claveCarrera}>
                          {carrera.nombreCarrera}
                        </MenuItem>
                      );
                    })}
                  </CustomSelect>
                </FormControl>
              </Grid>
            </Grid>

            {/* TELEFONO Y SEMESTRE */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Teléfono</label>
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  {...register("telefono", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  error={!!errors.telefono}
                  InputProps={{
                    endAdornment: errors.telefono ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Semestre</label>
                <FormControl fullWidth error={!!errors.semester}>
                  <InputLabel>Semestre</InputLabel>
                  <CustomSelect
                    label="Semestre"
                    defaultValue=""
                    {...register("semestre", { required: true })}
                    error={!!errors.semestre}
                    endAdornment={
                      errors.semestre ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="1">1er. Semestre</MenuItem>
                    <MenuItem value="2">2do. Semestre</MenuItem>
                    <MenuItem value="3">3er. Semestre</MenuItem>
                    <MenuItem value="4">4to. Semestre</MenuItem>
                    <MenuItem value="5">5to. Semestre</MenuItem>
                    <MenuItem value="6">6to. Semestre</MenuItem>
                    <MenuItem value="7">7mo. Semestre</MenuItem>
                    <MenuItem value="8">8vo. Semestre</MenuItem>
                    <MenuItem value="9">9no. Semestre</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>
            </Grid>

            {/* CORREO ELECTRONICO */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label className="col-form-label">Correo Electrónico</label>
                <TextField
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  {...register("correo", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  error={!!errors.correo}
                  InputProps={{
                    endAdornment: errors.correo ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
            </Grid>

            {/* BOTONES */}
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
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown={false}
            sx={{ zIndex: 1300 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'visible',
                width: '500px',
                minHeight: 'auto',
                position: 'relative'
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
              pt: 3,
              pb: 2,
              textAlign: 'center',
              backgroundColor: 'white',
              px: 3
            }}>
              <Typography variant="body1" sx={{ mt: 1, mb: 2, color: '#1B396A', fontWeight: 'bold' }}>
                ¿Está seguro de registrar al estudiante?
              </Typography>
              <Box sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                p: 2,
                mb: 2,
                border: '1px solid #e0e0e0'
              }}>
                <Typography variant="h6" sx={{
                  color: '#1B396A',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  {formData?.nombre || 'N/A'} {formData?.apellidos || ''}
                </Typography>
                <Typography variant="body2" sx={{
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  mt: 0.5
                }}>
                  No. Control: {formData?.noControl || 'N/A'}
                </Typography>
                {formData?.claveCarrera && (
                  <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem'
                  }}>
                    Carrera: {carreras.find(c => c.claveCarrera == formData.claveCarrera)?.nombreCarrera || formData.claveCarrera}
                  </Typography>
                )}
              </Box>
              <DialogContentText sx={{
                fontSize: '0.85rem',
                color: 'text.primary',
                lineHeight: 1.3
              }}>
                Esta acción creará un nuevo estudiante en el sistema.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
              p: 2.5,
              justifyContent: 'center',
              gap: 2,
              backgroundColor: 'white',
              position: 'relative',
              zIndex: 1400
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
                  cursor: 'pointer',
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
                size="medium"
                startIcon={<SaveIcon fontSize="small" />}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  backgroundColor: '#1B396A',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
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
            open={openSuccessModal}
            onClose={handleCloseSuccessModal}
            maxWidth="xs"
            fullWidth
            sx={{ zIndex: 1300 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'visible',
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
                El estudiante ha sido registrado correctamente en el sistema.
              </Typography>
            </DialogContent>
            <DialogActions sx={{
              p: 2.5,
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
              <Button
                onClick={handleCloseSuccessModal}
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
            sx={{ zIndex: 1300 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'visible',
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

          {/* Modal de Error */}
          <Dialog
            open={openErrorModal}
            onClose={handleCloseErrorModal}
            maxWidth="xs"
            fullWidth
            sx={{ zIndex: 1300 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'visible',
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
                  <ErrorIcon fontSize="medium" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                  Error en el Registro
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
                {errorMessage}
              </Typography>
              <DialogContentText sx={{
                fontSize: '0.85rem',
                color: 'text.primary',
                lineHeight: 1.3
              }}>
                Por favor, verifica los datos e intenta de nuevo.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
              p: 2.5,
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
              <Button
                onClick={handleCloseErrorModal}
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
                Entendido
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default AlumnosRegistro;