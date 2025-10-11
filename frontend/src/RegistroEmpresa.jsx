import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
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
import Footer from "./components/Footer";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { createEmpresa } from "./api/Empresa.api.js";
import { useState } from "react";

// styles Select
const CustomSelect = styled(Select)(({ error }) => ({
  "& .MuiSelect-icon": {
    right: error ? 40 : 10,
  },
  "& .MuiInputAdornment-root": {
    marginRight: error ? 0 : -20,
  },
}));

function RegistroEmpresa() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    // Guardar los datos del formulario para usar en la confirmación
    setFormData(data);
    setOpenConfirmModal(true);
  });

  const handleConfirmRegistration = async () => {
    try {
      console.log(formData);
      const res = await createEmpresa(formData);
      console.log("Empresa creada exitosamente:", res);
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);
    } catch (error) {
      console.error("Error al crear empresa:", error.response ? error.response.data : error.message);
      setOpenConfirmModal(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate("/CrudEmpresas");
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
    window.history.back();
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
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de Empresa
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de registrar
          </Typography>

          <form onSubmit={onSubmit}>
            {/* NOMBRE DE LA EMPRESA Y RFC */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputNombreEmpresa" className="col-form-label">
                  Nombre de la empresa
                </label>
                <TextField
                  label="Nombre de la empresa"
                  variant="outlined"
                  fullWidth
                  {...register("nombreEmpresa", {
                    required: true,
                    pattern: /[a-zA-Z0-9\s\.\-&]+/,
                  })}
                  error={!!errors.nombreEmpresa}
                  InputProps={{
                    endAdornment: errors.nombreEmpresa ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputRFC" className="col-form-label">
                  RFC
                </label>
                <TextField
                  label="RFC"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 13, minLength: 12 }}
                  {...register("rfc", {
                    required: true,
                    pattern: /^([A-ZÑ&]{3,4}) ?-?([0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])) ?-?([A-Z\d]{2})([A\d])$/,
                  })}
                  error={!!errors.rfc}
                  InputProps={{
                    endAdornment: errors.rfc ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
            </Grid>

            {/* RAZON SOCIAL Y SECTOR */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputRazonSocial" className="col-form-label">
                  Razón Social
                </label>
                <TextField
                  label="Razón Social"
                  variant="outlined"
                  fullWidth
                  {...register("razonSocial", {
                    required: true,
                    pattern: /[a-zA-Z0-9\s\.\-&]+/,
                  })}
                  error={!!errors.razonSocial}
                  InputProps={{
                    endAdornment: errors.razonSocial ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Sector</label>
                <FormControl fullWidth error={!!errors.sector}>
                  <InputLabel>Sector</InputLabel>
                  <CustomSelect
                    label="Sector"
                    defaultValue=""
                    {...register("sector", { required: true })}
                    error={!!errors.sector}
                    endAdornment={
                      errors.sector ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="Privado">Privado</MenuItem>
                    <MenuItem value="Publico">Publico</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>
            </Grid>

            {/* TIPO DE EMPRESA */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="inputTipoEmpresa" className="col-form-label">
                  Tipo de empresa
                </label>
                <TextField
                  label="Tipo de empresa"
                  variant="outlined"
                  fullWidth
                  {...register("tipoEmpresa", {
                    required: true,
                    pattern: /[a-zA-Z0-9\s\.\-&]+/,
                  })}
                  error={!!errors.tipoEmpresa}
                  InputProps={{
                    endAdornment: errors.tipoEmpresa ? (
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
            maxWidth="xs"
            fullWidth
            sx={{ zIndex: 2100 }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                width: '500px',
                maxHeight: '500px'
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
                ¿Está seguro de registrar la siguiente empresa?
              </Typography>
              {formData && (
                <Box sx={{ mt: 2, mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1B396A' }}>
                    Nombre: {formData.nombreEmpresa}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1B396A', mt: 1 }}>
                    RFC: {formData.rfc}
                  </Typography>
                </Box>
              )}
              <DialogContentText sx={{
                fontSize: '0.85rem',
                color: 'text.primary',
                lineHeight: 1.3
              }}>
                Esta acción creará una nueva empresa en el sistema.
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
                La empresa ha sido registrada correctamente en el sistema.
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
      <Footer />
    </Box>
  );
}

export default RegistroEmpresa;