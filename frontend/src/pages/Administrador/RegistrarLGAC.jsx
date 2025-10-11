import React, { useEffect, useState } from "react";
import { getCarreras } from "../../api/carrera.api";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
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
import { createLineaInv, updateLineaInv, getLineaInv } from "../../api/LineaInv.api";
import { chechSession, checkRol } from "../../api/Credenciales.api";

function RegistrarLGAC() {
  const navigate = useNavigate();
  const location = useLocation();
  const idLineaInvestigacion = location.state?.idLineaInvestigacion;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [carreras, setCarreras] = useState([]);
  const [carrerasLoaded, setCarrerasLoaded] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const carreraValue = watch("carrera", "");

  // Cargar carreras 
  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await chechSession();
      const rol = await checkRol();

      if (!isLoggedIn || rol.Rol !== "Administrador") {
        navigate("/");
        return;
      }
      getCarreras()
        .then(data => {
          setCarreras(data);
          setCarrerasLoaded(true);
        })
        .catch(error => {
          console.error("Error al obtener carreras:", error);
          setCarreras([]);
          setCarrerasLoaded(true);
        });
    }
    fetchData();
  }, []);

  // Precargar datos 
  useEffect(() => {
    if (idLineaInvestigacion && carrerasLoaded) {
      getLineaInv(idLineaInvestigacion).then(linea => {
        setValue("nombre", linea.nombre);
        setValue("instituto", linea.institucionRegistro);
        setValue("carrera", linea.claveCarrera);
        setValue("lineaID", linea.idLineaInvestigacion);
      });
    }
  }, [idLineaInvestigacion, setValue, carrerasLoaded]);

  const onSubmit = async (data) => {
    setFormData(data);
    setOpenConfirmModal(true);
  };

  const handleConfirmRegistration = async () => {
    try {
      const datos = {
        ...formData,
        claveCarrera: formData.carrera,
        idLineaInvestigacion: formData.lineaID,
        institucionRegistro: formData.instituto,
      };
      delete datos.carrera;
      delete datos.lineaID;
      delete datos.instituto;

      if (idLineaInvestigacion) {
        await updateLineaInv(idLineaInvestigacion, datos);
      } else {
        await createLineaInv(datos);
      }
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);
    } catch (error) {
      setOpenConfirmModal(false);
      if (error.response && error.response.data) {
        alert("Error: " + JSON.stringify(error.response.data));
      } else {
        alert("Error al registrar la LGAC");
      }
      console.error(error);
    }
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setFormData(null);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate("/Administracion/LGAC");
  };

  const handleRegresar = () => {
    setOpenCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setOpenCancelModal(false);
    navigate("/Administracion/LGAC");
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de LGAC
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de registrar.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Nombre</label>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  {...register("nombre", { required: true })}
                  error={!!errors.nombre}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Instituto de registro</label>
                <TextField
                  label="Instituto de registro"
                  variant="outlined"
                  fullWidth
                  {...register("instituto", { required: true })}
                  error={!!errors.instituto}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.carrera}>
                  <InputLabel shrink>Carrera</InputLabel>
                  <Controller
                    name="carrera"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Carrera"
                        displayEmpty
                        value={carreraValue}
                        inputProps={{ "aria-label": "Carrera" }}
                      >
                        <MenuItem value="">
                          <em>Selecciona una carrera</em>
                        </MenuItem>
                        {carreras.map((carrera) => (
                          <MenuItem key={carrera.claveCarrera} value={carrera.claveCarrera}>
                            {carrera.nombreCarrera}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">LineaID</label>
                <TextField
                  label="LineaID"
                  variant="outlined"
                  fullWidth
                  {...register("lineaID", { required: true })}
                  error={!!errors.lineaID}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

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

          {/* Modal de Confirmación de Registro */}
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
                ¿Está seguro de registrar la LGAC?
              </Typography>
              <DialogContentText sx={{
                fontSize: '0.85rem',
                color: 'text.primary',
                lineHeight: 1.3
              }}>
                Esta acción creará/actualizará la línea de investigación en el sistema.
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
            open={openSuccessModal}
            onClose={handleCloseSuccessModal}
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
                La LGAC ha sido registrada correctamente en el sistema.
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
        </Container>
      </Box>
    </Box>
  );
}

export default RegistrarLGAC;