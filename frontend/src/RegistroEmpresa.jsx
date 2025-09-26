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
} from "@mui/material";
import Footer from "./components/Footer";
import ErrorIcon from "@mui/icons-material/Error";
import { createEmpresa } from "./api/Empresa.api.js";

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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await createEmpresa(data);
    console.log(res);
    navigate("/CrudEmpresas");
  });

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

export default RegistroEmpresa;