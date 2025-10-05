import React from "react";
import { get, useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid, Box, CssBaseline, FormHelperText, Collapse, Alert, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import SaveIcon from "@mui/icons-material/Save";
import { createInvestigador, getInvestigador, updateInvestigador } from "../../api/Investigadores.api";
import { getCarreras } from "../../api/carrera.api";

function RegistroInvestigadores() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues
  } = useForm();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [carreras, setCarreras] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState("");

  // Estados para los modales
  const [openConfirmUpdate, setOpenConfirmUpdate] = React.useState(false);
  const [openConfirmCancel, setOpenConfirmCancel] = React.useState(false);
  const [investigadorData, setInvestigadorData] = React.useState({});

  const messages = {
    req: "Este campo es obligatorio",
  };

  //CARGAR LAS CARRERAS
  React.useEffect(() => {
    getCarreras()
      .then(data => setCarreras(Array.isArray(data) ? data : []))
      .catch(() => setCarreras([]));
    console.log("carreras", carreras);
  }, []);

  //CARGA DATOS DEL INVESTIGADOR PARA EDITAR
  React.useEffect(() => {
    if (id) {
      getInvestigador(id).then(data => {
        reset(data); //LLena el formulario con los datos que le pase
        setInvestigadorData(data); // Guardamos los datos originales
      });
    }
  }, [id, reset]);

  // Función para manejar la confirmación de actualización
  const handleConfirmUpdate = async (data) => {
    try {
      if (isEdit) {
        await updateInvestigador(id, data);
      } else {
        await createInvestigador(data);
      }
      setOpenConfirmUpdate(false);
      navigate("/Administracion/Investigadores");
    } catch (error) {
      setOpenConfirmUpdate(false);
      // Si el backend responde con un error, muestra el mensaje específico
      if (error.response && error.response.data) {
        // Si el backend devuelve un objeto con varios errores, los mostramos todos
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
        alert("Error al registrar al investigador. Por favor, inténtalo de nuevo.");
      }
      console.error("Error al crear al investigador:", error);
    }
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    if (isEdit) {
      // Si es edición, mostrar modal de confirmación
      setOpenConfirmUpdate(true);
    } else {
      // Si es creación, proceder directamente
      handleConfirmUpdate(data);
    }
  };

  // Función para manejar el botón regresar
  const handleRegresar = () => {
    if (isEdit) {
      // Si está editando, mostrar modal de confirmación para cancelar
      setOpenConfirmCancel(true);
    } else {
      // Si está creando, navegar directamente
      navigate("/Administracion/Investigadores");
    }
  };

  // Función para confirmar cancelación
  const handleConfirmCancel = () => {
    setOpenConfirmCancel(false);
    navigate("/Administracion/Investigadores");
  };

  // Obtener el nombre completo del investigador
  const getNombreCompleto = () => {
    const values = getValues();
    return `${values.nombre || investigadorData.nombre || ''} ${values.apellidos || investigadorData.apellidos || ''}`.trim();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 7, mb: 7, alignContent: 'center' }}>
        <Container maxWidth="lg" sx={{ padding: '20px 30px', margin: 'auto' }}>
          <Typography variant="h4" align="center">
            {isEdit ? "Actualizar Investigador" : "Registro de Investigador"}
          </Typography>
          <Typography variant="body1" align="center" style={{ marginTop: "10px" }}>
            Captura los campos con la información correspondiente, valida la información antes de registrar.
          </Typography>
          {/* ALERTAS */}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="p-3" sx={{ justifyContent: 'space-between' }}>
              {/* CURP */}
              {!isEdit && (
                <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                  <label htmlFor="inputCurp" className="col-form-label">
                    CURP
                  </label>
                  <TextField
                    placeholder="AAAA000000HDFRNS00"
                    variant="outlined"
                    fullWidth
                    {...register("curp", { required: true })}
                    error={!!errors.curp}
                    helperText={errors.curp && messages.req}
                  />
                </Grid>
              )}
              {/* ID CREDENCIAL */}
              {/* <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
                <label htmlFor="id_Credencial" className="col-form-label">
                  ID Credencial
                </label>
                <TextField
                  placeholder="ID Credencial"
                  variant="outlined"
                  fullWidth
                  {...register("id_Credencial", { required: true })}
                  error={!!errors.id_Credencial}
                  helperText={errors.id_Credencial && messages.req}
                />
              </Grid> */}
              {/* NOMBRE */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="inputNombre" className="col-form-label">
                  Nombre(s)
                </label>
                <TextField
                  placeholder="Nombre(s)"
                  variant="outlined"
                  fullWidth
                  {...register("nombre", { required: true })}
                  error={!!errors.nombre}
                  helperText={errors.nombre && messages.req}
                />
              </Grid>
              {/* APELLIDOS */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="inputApellidos" className="col-form-label">
                  Apellido(s)
                </label>
                <TextField
                  placeholder="Apellido(s)"
                  variant="outlined"
                  fullWidth
                  {...register("apellidos", { required: true })}
                  error={!!errors.apellidos}
                  helperText={errors.apellidos && messages.req}
                />
              </Grid>
              {/* CARRERA */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.claveCarrera}>
                  <InputLabel>Carrera</InputLabel>
                  <Controller
                    name="claveCarrera"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        label="Carrera"
                        {...field}
                        value={field.value ?? ""} // Para evitar undefined
                      >
                        {carreras.map((carrera) => (
                          <MenuItem key={carrera.claveCarrera} value={carrera.claveCarrera}>
                            {carrera.nombreCarrera}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.claveCarrera && (
                    <FormHelperText>{messages.req}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* CORREO */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1 }}>
                <label htmlFor="inputCorreo" className="col-form-label">
                  Correo
                </label>
                <TextField
                  placeholder="Correo"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...register("correo", { required: true })}
                  error={!!errors.correo}
                  helperText={errors.correo && messages.req}
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
                  {isEdit ? "Actualizar" : "Registrar"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>

      {/* MODAL DE CONFIRMACIÓN PARA ACTUALIZAR MEJORADO */}
      <Dialog
        open={openConfirmUpdate}
        onClose={() => setOpenConfirmUpdate(false)}
        maxWidth="xs"
        fullWidth
        sx={{ zIndex: 2100 }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            width: '380px'
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          p: 2.5,
          backgroundColor: '#1B396A',
          color: 'white',
          fontWeight: 'bold',
          position: 'relative'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5
          }}>
            <Avatar sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 50,
              height: 50
            }}>
              <CheckCircleIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" fontSize="1.1rem">
              Confirmar Actualización
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{
          pt: '80px',
          pb: 4,
          textAlign: 'center',
          backgroundColor: 'white',
          px: 4
        }}>
          <Typography variant="body1" sx={{ mb: 3, color: '#1B396A', fontWeight: 'bold' }}>
            ¿Está seguro de actualizar los datos?
          </Typography>
          <DialogContentText sx={{
            fontSize: '0.9rem',
            color: 'text.primary',
            lineHeight: 1.4
          }}>
            Se actualizarán los datos del investigador <strong>{getNombreCompleto()}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          p: 2.5,
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'white'
        }}>
          <Button
            onClick={() => setOpenConfirmUpdate(false)}
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
            onClick={() => handleConfirmUpdate(getValues())}
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

      {/* MODAL DE CONFIRMACIÓN PARA CANCELAR MEJORADO */}
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
            width: '380px'
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          p: 2.5,
          backgroundColor: '#1B396A',
          color: 'white',
          fontWeight: 'bold',
          position: 'relative'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5
          }}>
            <Avatar sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 50,
              height: 50
            }}>
              <WarningIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" fontSize="1.1rem">
              Cancelar Actualización
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{
          pt: '80px',
          pb: 4,
          textAlign: 'center',
          backgroundColor: 'white',
          px: 4
        }}>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.primary', fontWeight: 'bold' }}>
            ¿Cancelar la actualización?
          </Typography>
          <DialogContentText sx={{
            fontSize: '0.9rem',
            color: 'text.primary',
            lineHeight: 1.4
          }}>
            Los cambios del investigador <strong>{getNombreCompleto()}</strong> no se guardarán.
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
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default RegistroInvestigadores;