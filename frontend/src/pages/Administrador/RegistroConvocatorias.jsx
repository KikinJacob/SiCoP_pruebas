import React from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import RegistroProyecto from "../../components/RegistroProyecto";
import {Container, Typography, Box, CssBaseline, Collapse, Alert, IconButton} from "@mui/material";
import { createConvocatoria } from "../../api/Convocatoria.api";
import CloseIcon from "@mui/icons-material/Close";

export default function RegistroConvocatorias() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState(""); 

  const messages = {
    req: "Este campo es obligatorio",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createConvocatoria(data);
      navigate("/Administracion/Convocatorias");
    } catch (error) {
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
        setMensajeError("Error al registrar la convocatoria. Por favor, inténtalo de nuevo.");
      }
      console.error("Error al crear la convocatoria:", error);
    }
  };
  
  return (
    <div
      style={{display:'flex', flexDirection: "column", minHeight: "100vh"}}
    >
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 7, mb: 7 , alignContent: 'center'}}>
        <Container maxWidth="lg" sx={{padding:'20px 30px', margin:'auto'}}>
          <Typography variant="h4" align="center">
            Registro de Convocatoria
          </Typography>
          <Typography variant="body1" align="center" style={{ marginTop: "10px"}}>
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
            <Grid container className="p-3" sx={{justifyContent: 'space-between'}}>
              {/*NOMBRE DE LA CONVOCATORIA*/}
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
                <label htmlFor="InputNombre" className="col-form-label">
                  Clave convocatoria
                </label>
                <TextField
                  label="Clave convocatoria"
                  variant="outlined"
                  fullWidth
                  {...register("clave_convocatoria", { required: true })}
                  error={!!errors.clave_convocatoria}
                />
              </Grid>
              {/*NOMBRE DE LA CONVOCATORIA*/}
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
                <label htmlFor="InputNombre" className="col-form-label">
                  Nombre convocatoria
                </label>
                <TextField
                  label="Nombre convocatoria"
                  variant="outlined"
                  fullWidth
                  {...register("convocatoria", { required: true })}
                  error={!!errors.convocatoria}
                />
              </Grid>
              {/* FECHA INICIO */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
              {/* FECHA FIN */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
              {/* INSTITUCION FINANCIAMIENTO */}
              <Grid item xs={12} sm={12} sx={{ my: 1}}>
                <label htmlFor="institucionFinanciamiento" className="col-form-label">
                  Institución financiamiento
                </label>
                <TextField
                  label="Institución financiamiento"
                  variant="outlined"
                  fullWidth
                  {...register("institucionFinanciamiento")}
                  error={!!errors.institucionFinanciamiento}
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
                  onClick={() => navigate("/Administracion/Convocatorias")}
                  style={{ borderColor: "#1B396A", color: "#1B396A", borderRadius: "20px",}}
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
                  style={{ backgroundColor: "#1B396A", color: "#fff", borderRadius: "20px",}}
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
    </div>
  );
}
