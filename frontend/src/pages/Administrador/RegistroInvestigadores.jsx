
import React from "react";
import { get, useForm, Controller} from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";
import { Container,Typography,TextField,Select,MenuItem,Button,FormControl,InputLabel,Grid,Box,CssBaseline,FormHelperText, Collapse,Alert,IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createInvestigador, getInvestigador, updateInvestigador } from "../../api/Investigadores.api"; 
import { getCarreras} from "../../api/carrera.api";

function RegistroInvestigadores() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
    control
  } = useForm();
  const {id} = useParams();
  const isEdit = Boolean(id); 
  const [carreras, setCarreras] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState("");
  const messages = {
    req: "Este campo es obligatorio",
  };
  
  //CARGAR LAS CARRERAS
  React.useEffect(() => {
    getCarreras()
      .then(data => setCarreras(Array.isArray(data) ? data : []))
      .catch(() => setCarreras([]));
    console.log("carreras",carreras);
  }, []);

  //CARGA DATOS DEL INVESTIGADOR PARA EDITAR
  React.useEffect(() => {
    if(id) {
      getInvestigador(id).then(data=>{   
        reset(data); //LLena el formulario con los datos que le pase
      });
    }
  }, [id, reset]);

  //ENVIO DEL FORMULARIO
  const onSubmit = async (data) => {
    try {
      if(isEdit){
        await updateInvestigador(id, data);
      }else{
        await createInvestigador(data);
      }
      navigate("/Administracion/Investigadores");
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
        alert("Error al registrar al investigador. Por favor, inténtalo de nuevo.");
      }
      console.error("Error al crear al investigador:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 7, mb: 7, alignContent: 'center' }}>
        <Container maxWidth="lg" sx={{padding:'20px 30px', margin:'auto'}}>
          <Typography variant="h4" align="center">
            {isEdit ? "Actualizar Investigador" : "Registro de Investigador"}
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
              {/* CURP */}
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
              <Grid item xs={12} sm={5.8} sx={{ my: 1}}>
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
                  onClick={() => navigate("/Administracion/Investigadores")}
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
                  {isEdit ? "Actualizar" : "Registrar"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
export default RegistroInvestigadores;
