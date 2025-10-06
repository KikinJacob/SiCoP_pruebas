import React from "react";
import { Button, Grid, InputAdornment, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar } from "@mui/material";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import SaveIcon from "@mui/icons-material/Save";
import RegistroProyecto from "../../components/RegistroProyecto";
import { Container, Typography, Box, CssBaseline, Collapse, Alert, IconButton } from "@mui/material";
import { createConvocatoria } from "../../api/Convocatoria.api";
import CloseIcon from "@mui/icons-material/Close";

export default function RegistroConvocatorias() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState("");
  const [openConfirmRegister, setOpenConfirmRegister] = React.useState(false);
  const [openConfirmCancel, setOpenConfirmCancel] = React.useState(false);

  const messages = {
    req: "Este campo es obligatorio",
    minLength: "Debe tener al menos 10 caracteres",
    maxLength: "Máximo 500 caracteres"
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm();

  const handleSubmitForm = (data) => {
    setOpenConfirmRegister(true);
  };

  const confirmRegister = async () => {
    try {
      const data = getValues();
      await createConvocatoria(data);
      setOpenConfirmRegister(false);
      navigate("/Administracion/Convocatorias");
    } catch (error) {
      setOpenConfirmRegister(false);
      if (error.response && error.response.data) {
        const errores = error.response.data;
        let mensaje = "";
        if (typeof errores === "string") {
          mensaje = errores;
        } else if (typeof errores === "object") {
          mensaje = Object.values(errores).flat().join("\n");
        } else {
          mensaje = "Error desconocido";
        }
        setMensajeError(mensaje);
        setOpen(true);
      } else {
        setMensajeError("Error al registrar la convocatoria. Por favor, inténtalo de nuevo.");
        setOpen(true);
      }
      console.error("Error al crear la convocatoria:", error);
    }
  };

  const handleRegresar = () => {
    setOpenConfirmCancel(true);
  };

  const confirmCancel = () => {
    setOpenConfirmCancel(false);
    navigate("/Administracion/Convocatorias");
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: "column", minHeight: "100vh" }}
    >
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 7, mb: 7, alignContent: 'center' }}>
        <Container maxWidth="lg" sx={{ padding: '20px 30px', margin: 'auto' }}>
          <Typography variant="h4" align="center">
            Registro de Convocatoria
          </Typography>
          <Typography variant="body1" align="center" style={{ marginTop: "10px" }}>
            Captura los campos con la información correspondiente, valida la información antes de registrar.
          </Typography>

          <Collapse in={open}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 2 }}
            >
              {mensajeError}
            </Alert>
          </Collapse>

          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid container className="p-3" sx={{ justifyContent: 'space-between' }}>

              {/* CLAVE CONVOCATORIA */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="clave_convocatoria" className="col-form-label">
                  Clave convocatoria
                </label>
                <TextField
                  placeholder="Ej: CONV2024001"
                  variant="outlined"
                  fullWidth
                  {...register("clave_convocatoria", {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                  })}
                  error={!!errors.clave_convocatoria}
                  helperText={errors.clave_convocatoria && (
                    errors.clave_convocatoria.type === 'required' ? messages.req :
                      errors.clave_convocatoria.type === 'minLength' ? "Mínimo 5 caracteres" :
                        errors.clave_convocatoria.type === 'maxLength' ? "Máximo 20 caracteres" : ""
                  )}
                />
              </Grid>

              {/* NOMBRE CONVOCATORIA */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="convocatoria" className="col-form-label">
                  Nombre de la convocatoria
                </label>
                <TextField
                  placeholder="Ej: Convocatoria de Investigación 2024"
                  variant="outlined"
                  fullWidth
                  {...register("convocatoria", {
                    required: true,
                    minLength: 10,
                    maxLength: 100
                  })}
                  error={!!errors.convocatoria}
                  helperText={errors.convocatoria && (
                    errors.convocatoria.type === 'required' ? messages.req :
                      errors.convocatoria.type === 'minLength' ? messages.minLength :
                        errors.convocatoria.type === 'maxLength' ? "Máximo 100 caracteres" : ""
                  )}
                />
              </Grid>

              {/* DESCRIPCIÓN */}
              <Grid item xs={12} sx={{ my: 1 }}>
                <label htmlFor="descripcion" className="col-form-label">
                  Descripción
                </label>
                <TextField
                  placeholder="Describe el objetivo y alcance de la convocatoria..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  {...register("descripcion", {
                    required: true,
                    minLength: 20,
                    maxLength: 500
                  })}
                  error={!!errors.descripcion}
                  helperText={errors.descripcion && (
                    errors.descripcion.type === 'required' ? messages.req :
                      errors.descripcion.type === 'minLength' ? "Mínimo 20 caracteres" :
                        errors.descripcion.type === 'maxLength' ? messages.maxLength : ""
                  )}
                />
              </Grid>

              {/* FECHA INICIO CONVOCATORIA */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="fechaInicioConvocatoria" className="col-form-label">
                  Fecha de inicio convocatoria
                </label>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaInicioConvocatoria", { required: true })}
                  error={!!errors.fechaInicioConvocatoria}
                  helperText={errors.fechaInicioConvocatoria && messages.req}
                />
              </Grid>

              {/* FECHA FIN CONVOCATORIA */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="fechaFinConvocatoria" className="col-form-label">
                  Fecha de fin convocatoria
                </label>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaFinConvocatoria", { required: true })}
                  error={!!errors.fechaFinConvocatoria}
                  helperText={errors.fechaFinConvocatoria && messages.req}
                />
              </Grid>

              {/* FECHA INICIO FINANCIAMIENTO */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="fechaInicioFinanciamiento" className="col-form-label">
                  Fecha de inicio financiamiento
                </label>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaInicioFinanciamiento", { required: true })}
                  error={!!errors.fechaInicioFinanciamiento}
                  helperText={errors.fechaInicioFinanciamiento && messages.req}
                />
              </Grid>

              {/* FECHA FIN FINANCIAMIENTO */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="fechaFinFinanciamiento" className="col-form-label">
                  Fecha de fin financiamiento
                </label>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaFinFinanciamiento", { required: true })}
                  error={!!errors.fechaFinFinanciamiento}
                  helperText={errors.fechaFinFinanciamiento && messages.req}
                />
              </Grid>

              {/* INSTITUCIÓN FINANCIAMIENTO */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="institucionFinanciamiento" className="col-form-label">
                  Institución financiamiento
                </label>
                <TextField
                  placeholder="Ej: CONACYT, Universidad, Gobierno..."
                  variant="outlined"
                  fullWidth
                  {...register("institucionFinanciamiento", {
                    required: true,
                    minLength: 3,
                    maxLength: 100
                  })}
                  error={!!errors.institucionFinanciamiento}
                  helperText={errors.institucionFinanciamiento && (
                    errors.institucionFinanciamiento.type === 'required' ? messages.req :
                      errors.institucionFinanciamiento.type === 'minLength' ? "Mínimo 3 caracteres" :
                        errors.institucionFinanciamiento.type === 'maxLength' ? "Máximo 100 caracteres" : ""
                  )}
                />
              </Grid>

              {/* PRESUPUESTO */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="presupuesto" className="col-form-label">
                  Presupuesto (Opcional)
                </label>
                <TextField
                  type="number"
                  placeholder="0.00"
                  variant="outlined"
                  fullWidth
                  inputProps={{ min: 0, step: 0.01 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        $
                      </InputAdornment>
                    ),
                  }}
                  {...register("presupuesto", {
                    min: 0
                  })}
                  error={!!errors.presupuesto}
                  helperText={errors.presupuesto && "El presupuesto debe ser mayor a 0"}
                />
              </Grid>

              {/* REQUISITOS */}
              <Grid item xs={12} sx={{ my: 1 }}>
                <label htmlFor="requisitos" className="col-form-label">
                  Requisitos
                </label>
                <TextField
                  placeholder="Lista los requisitos necesarios para participar en la convocatoria..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("requisitos", {
                    required: true,
                    minLength: 20,
                    maxLength: 1000
                  })}
                  error={!!errors.requisitos}
                  helperText={errors.requisitos && (
                    errors.requisitos.type === 'required' ? messages.req :
                      errors.requisitos.type === 'minLength' ? "Mínimo 20 caracteres" :
                        errors.requisitos.type === 'maxLength' ? "Máximo 1000 caracteres" : ""
                  )}
                />
              </Grid>

            </Grid>

            {/* BOTONES */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={handleRegresar}
                  style={{ borderColor: "#1B396A", color: "#1B396A", borderRadius: "20px", }}
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
                  style={{ backgroundColor: "#1B396A", color: "#fff", borderRadius: "20px", }}
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
        </Container>
      </Box>

      {/* MODAL DE CONFIRMACIÓN PARA REGISTRAR */}
      <Dialog
        open={openConfirmRegister}
        onClose={() => setOpenConfirmRegister(false)}
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
            ¿Está seguro de registrar la convocatoria?
          </Typography>
          <DialogContentText sx={{
            fontSize: '0.85rem',
            color: 'text.primary',
            lineHeight: 1.3
          }}>
            Esta acción creará una nueva convocatoria en el sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          p: 2.5,
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'white'
        }}>
          <Button
            onClick={() => setOpenConfirmRegister(false)}
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
            onClick={confirmRegister}
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
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL DE CONFIRMACIÓN PARA REGRESAR */}
      <Dialog
        open={openConfirmCancel}
        onClose={() => setOpenConfirmCancel(false)}
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
            onClick={() => setOpenConfirmCancel(false)}
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
            onClick={confirmCancel}
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
    </div>
  );
}
