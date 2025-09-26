import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
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

function ColaborRegistro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    // Aquí puedes manejar el registro del colaborador
    console.log(data);
    navigate("/Colaboradores");
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de Colaborador
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de registrar
          </Typography>

          <form onSubmit={onSubmit}>
            {/* CURP */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="inputCurp" className="col-form-label">
                  CURP
                </label>
                <TextField
                  label="CURP"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 18, minLength: 18 }}
                  {...register("curp", {
                    required: true,
                    pattern: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/,
                  })}
                  error={!!errors.curp}
                  InputProps={{
                    endAdornment: errors.curp ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </Grid>
            </Grid>

            {/* CARRERA */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.carrera}>
                  <InputLabel>Carrera</InputLabel>
                  <CustomSelect
                    label="Carrera"
                    {...register("carrera", { required: true })}
                    error={!!errors.carrera}
                    endAdornment={
                      errors.carrera ? (
                        <InputAdornment position="end">
                          <ErrorIcon color="error" />
                        </InputAdornment>
                      ) : null
                    }
                  >
                    <MenuItem value="Ingeniería en Sistemas Computacionales">
                      Ingeniería en Sistemas Computacionales
                    </MenuItem>
                    <MenuItem value="Ingeniería en Sistemas Automotrices">
                      Ingeniería en Sistemas Automotrices
                    </MenuItem>
                    <MenuItem value="Ingeniería Industrial">
                      Ingeniería Industrial
                    </MenuItem>
                    <MenuItem value="Ingeniería en Gestión Empresarial">
                      Ingeniería en Gestión Empresarial
                    </MenuItem>
                    <MenuItem value="Ingeniería Electronica">
                      Ingeniería Electronica
                    </MenuItem>
                    <MenuItem value="Ingeniería en Semiconductores">
                      Ingeniería en Semiconductores
                    </MenuItem>
                    <MenuItem value="Ingeniería Ambiental">
                      Ingeniería Ambiental
                    </MenuItem>
                    <MenuItem value="Gastronomía">
                      Gastronomía
                    </MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>
            </Grid>

            {/* NOMBRE Y APELLIDOS */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label htmlFor="inputNombre" className="col-form-label">
                  Nombre(s)
                </label>
                <TextField
                  label="Nombre(s)"
                  variant="outlined"
                  fullWidth
                  {...register("nombre", {
                    required: true,
                    pattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/,
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
                  Apellido(s)
                </label>
                <TextField
                  label="Apellido(s)"
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

            {/* TELEFONO Y CORREO ELECTRONICO */}
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

export default ColaborRegistro;