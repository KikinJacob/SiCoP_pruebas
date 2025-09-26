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
} from "@mui/material";
import Footer from "../components/Footer";
import ErrorIcon from "@mui/icons-material/Error";

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
  const location = useLocation();
  const estudiante = location.state?.estudiante || null; 
  const editar = Boolean(estudiante);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await createEstudiante(data);
    console.log(res);
    navigate(-1);
  });

  useEffect(() => {
   const fetchCarreras = async () => {
    try {
      const data = await getCarreras();

      if(editar){
        if(estudiante?.claveCarrera){
          const data = estudiante
        }
      }

      setCarreras(data);
    } catch (error) {
      console.error("Error al traer los datos: ", error);
    }
   }

    if(editar){
      reset({
      nombre: estudiante.nombre,
      apellidos: estudiante.apellidos,
      noControl: estudiante.noControl,
      // claveCarrera: estudiante.claveCarrera,
      telefono: estudiante.telefono,
      semestre: estudiante.semestre,
      correo: estudiante.correo,
    });
    }
  }, [editar, estudiante, reset]);

  // console.log("estudiante: ",estudiante);

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

          <form onSubmit={onSubmit}>
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
                    endAdornment={
                      errors.claveCarrera ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="">
                      <em>Selecciona una carrera</em>
                    </MenuItem>
                    {carreras.map((carrera) => (
                      <MenuItem key={carrera.claveCarrera} value={carrera.claveCarrera}>
                        {carrera.nombreCarrera}
                      </MenuItem>
                    ))}
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
                  onClick={() => window.history.back()}
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
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default AlumnosRegistro;