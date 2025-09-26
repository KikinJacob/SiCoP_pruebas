import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import Footer from "../components/Footer";
import { useRegistroProyecto } from "../components/Context";
import { getLineasInv } from "../api/LineaInv.api";
import { getCarreras } from "../api/carrera.api";

function RegistroProyecto1() {
  const [lineasInvestigacion, setLineasInvestigacion] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const { updateProyecto } = useRegistroProyecto();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Aquí puedes cargar las líneas de investigación desde una API o contexto
    const fetchLineasInvestigacion = async () => {
      const response = await getLineasInv();
      setLineasInvestigacion(response);
    };
    const fetchCarreras = async () => {
      const response = await getCarreras();
      setCarreras(response);
    }

    fetchLineasInvestigacion();
    fetchCarreras();
  }, []);

  const onSubmit = handleSubmit((data) => {
    // Aquí puedes manejar el registro del proyecto
    console.log(data);
    updateProyecto(data);
    navigate("/RegistroProyecto2");
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de Proyecto
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de registrar.
          </Typography>

          <form onSubmit={onSubmit}>
            {/* Nombre del proyecto */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="nombreProyecto" className="col-form-label">
                  Nombre del Proyecto
                </label>
                <TextField
                  label="Nombre del Proyecto"
                  variant="outlined"
                  fullWidth
                  {...register("nombreProyecto", { required: true })}
                  error={!!errors.nombreProyecto}
                />
              </Grid>
            </Grid>

            {/* Área de investigación y Línea de investigación */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Área de Investigación</label>
                <FormControl fullWidth error={!!errors.areaInvestigacion}>
                  <InputLabel>Área de Investigación</InputLabel>
                  <Select
                    label="Área de Investigación"
                    defaultValue=""
                    {...register("areaDesarrolloTec", { required: true })}
                  >
                    <MenuItem value="Ciencias Básicas">Ciencias Básicas</MenuItem>
                    <MenuItem value="Ingeniería">Ingeniería</MenuItem>
                    <MenuItem value="Salud">Salud</MenuItem>
                    <MenuItem value="Educación">Educación</MenuItem>
                    <MenuItem value="Sociales">Ciencias Sociales</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Línea de Investigación</label>
                <FormControl fullWidth error={!!errors.lineaInvestigacion}>
                  <InputLabel>Línea de Investigación</InputLabel>
                  <Select
                    label="Línea de Investigación"
                    defaultValue=""
                    {...register("lineaInvestigacion_LineaPk", { required: true })}
                  >
                    {lineasInvestigacion.map((inv) => (
                      <MenuItem key={inv.idLineaInvestigacion} value={inv.idLineaInvestigacion}>
                        {inv.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Carrera */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.carrera}>
                  <InputLabel>Carrera</InputLabel>
                  <Select
                    label="Carrera"
                    defaultValue=""
                    {...register("carrera", { required: true })}
                  >
                    <MenuItem value="">
                      <em>Seleccione una carrera</em>
                    </MenuItem>
                    {carreras.map((carrera) => (
                      <MenuItem key={carrera.claveCarrera} value={carrera.claveCarrera}>
                        {carrera.nombreCarrera}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Fechas */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Fecha de Inicio</label>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaInicio", { required: true })}
                  error={!!errors.fechaInicio}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Fecha de Finalización (estimada)</label>
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...register("fechaFin", { required: true })}
                  error={!!errors.fechaFin}
                />
              </Grid>
            </Grid>

            {/* Botones */}
            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Proyectos")}
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
                  Siguiente
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

export default RegistroProyecto1;