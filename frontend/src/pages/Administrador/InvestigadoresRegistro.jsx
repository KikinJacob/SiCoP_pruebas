import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

function InvestigadoresRegistro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await createAlumno(data);
    console.log(res);
    navigate("/Detalles/Alumnos");
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
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
                  {...register("name", {
                    required: true,
                    pattern: /[a-zA-Z\s]*/,
                  })}
                  error={!!errors.name}
                  InputProps={{
                    endAdornment: errors.name ? (
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
                  {...register("last_name", {
                    required: true,
                    pattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/,
                  })}
                  error={!!errors.last_name}
                  InputProps={{
                    endAdornment: errors.last_name ? (
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
                  {...register("controlN", {
                    required: true,
                    pattern: /[SDACEGMT]{1}[0-9]{2}(120){1}[0-9]{3}/,
                  })}
                  error={!!errors.controlN}
                  InputProps={{
                    endAdornment: errors.controlN ? (
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
                    {...register("career", { required: true })}
                    error={!!errors.career}
                    endAdornment={
                      errors.career ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="1">
                      Ingeniería en Sistemas Computacionales
                    </MenuItem>
                    <MenuItem value="2">
                      Ingeniería en Sistemas Automotrices
                    </MenuItem>
                    <MenuItem value="3">Ingeniería Industrial</MenuItem>
                    <MenuItem value="4">
                      Ingeniería en Gestión Empresarial
                    </MenuItem>
                    <MenuItem value="5">
                      Ingeniería Electronica
                    </MenuItem>
                    <MenuItem value="6">
                      Ingeniería en Gestión Empresarial
                    </MenuItem>
                    <MenuItem value="6">
                      Ingeniería en Semiconductores
                    </MenuItem>
                    <MenuItem value="7">Ingeniería Ambiental</MenuItem>
                    <MenuItem value="8">Gastronomía</MenuItem>
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
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  error={!!errors.phone}
                  InputProps={{
                    endAdornment: errors.phone ? (
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
                    {...register("semester", { required: true })}
                    error={!!errors.semester}
                    endAdornment={
                      errors.semester ? (
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
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  error={!!errors.email}
                  InputProps={{
                    endAdornment: errors.email ? (
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
    </Box>
  );
}

export default InvestigadoresRegistro;
