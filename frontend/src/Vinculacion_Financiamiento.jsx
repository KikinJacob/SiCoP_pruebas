import { useForm, Controller } from "react-hook-form"; // <-- Añadido Controller
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Grid,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { getAllConvocatorias } from "./api/Convocatoria.api.js"
import { useRegistroProyecto } from "./components/Context.jsx";
import { createProyecto } from "./api/Proyectos.api.js";

function VinculacionFinanciamiento() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control, // <-- Añadido control
    formState: { errors },
    watch,
  } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [convocatorias, setConvocatorias] = useState([]);
  const tieneFinanciamiento = watch("tieneFinanciamiento");
  const { updateProyecto, proyecto } = useRegistroProyecto();

  const financiadores = [
    { value: "empresa", label: "Empresa" },
    { value: "gobierno", label: "Gobierno" },
    { value: "universidad", label: "Universidad" },
    { value: "otro", label: "Otro" },
  ];

  const onSubmit = async (data) => {
    const datosCompletos = {
      ...proyecto,
      ...data,
      clave_convocatoria: data.convocatoria,
      financiamiento: data.tieneFinanciamiento,
    };

    try {
      console.log(data);
      const response = await createProyecto(datosCompletos);
      localStorage.clear();
      console.log("Proyecto creado exitosamente:", response);
      setOpenModal(true);
    } catch (error) {
      console.error(
        " Error al crear proyecto:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const fetchConvocatorias = async () => {
      const data = await getAllConvocatorias();
      setConvocatorias(data);
    };
    fetchConvocatorias();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/Proyectos");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mt: 3 }}>
            Vinculación y Financiamiento
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 3 }}>
            Captura los campos con la información correspondiente, valida la información antes de registrar
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Convocatoria */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel>Convocatoria</FormLabel>
                  <Select defaultValue="" {...register("convocatoria")}>
                    <MenuItem value="" disabled>
                      Selecciona una convocatoria
                    </MenuItem>
                    {convocatorias.map((c) => (
                      <MenuItem key={c.clave_convocatoria} value={c.clave_convocatoria}>
                        {c.convocatoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Tiene financiamiento (CON CONTROLLER) */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">¿Tiene financiamiento?</FormLabel>
                  <Controller
                    name="tieneFinanciamiento"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value="Si" control={<Radio />} label="Sí" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Quién financia */}
            {tieneFinanciamiento === "Si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Quién financia"
                      variant="outlined"
                      fullWidth
                      {...register("quienFinancia", { required: true })}
                      error={!!errors.quienFinancia}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {/* Monto */}
            {tieneFinanciamiento === "Si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Monto ($)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...register("monto")}
                  />
                </Grid>
              </Grid>
            )}

            {/* Fechas */}
            {tieneFinanciamiento === "Si" && (
              <Grid container spacing={2} className="p-3">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de inicio"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fechaInicioFinanciamiento")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fecha de fin"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("fechaFinFinanciamiento")}
                  />
                </Grid>
              </Grid>
            )}

            {/* Botones */}
            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Empresas")}
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

          {/* Modal */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Registro Exitoso</DialogTitle>
            <DialogContent>
              <DialogContentText>Proyecto registrado</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary" autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          <Typography variant="body2" align="center" sx={{ mt: 4, color: "#666" }}>
            En caso de que registre un dato mal, podrá modificarlo posteriormente...
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default VinculacionFinanciamiento;
