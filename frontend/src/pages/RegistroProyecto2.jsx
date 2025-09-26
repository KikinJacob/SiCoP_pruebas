import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  InputLabel,
  Grid,
  Box,
  CssBaseline,
} from "@mui/material";
import Footer from "../components/Footer";
import { getAllInvestigadores } from "../api/Investigadores.api";
import { useRegistroProyecto } from "../components/Context";

function RegistroProyecto2() {
  const { updateProyecto } = useRegistroProyecto();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [investigadores, setInvestigadores] = useState([]);

  const onSubmit = handleSubmit((data) => {
    updateProyecto(data);
    console.log(data);
    navigate("/Detalles/Metas");
  });

  useEffect(() => {
    const fetchingData = async () => {
      try {
        // LLAMADA DE LA API PARA OBTENER A LOS LIDERES DE PROYECTO
        const response = await getAllInvestigadores();
        setInvestigadores(response);
        console.log("Investigadores:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchingData();
  }, []);

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
            Captura los campos con la información correspondiente, valida la información antes de seguir
          </Typography>

          <form onSubmit={onSubmit}>
            {/* Resumen */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="resumen" className="col-form-label">
                  Resumen
                </label>
                <TextField
                  label="Resumen"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register("resumen", { required: true })}
                  error={!!errors.resumen}
                />
              </Grid>
            </Grid>

            {/* Objetivos */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label htmlFor="objetivos" className="col-form-label">
                  Objetivos
                </label>
                <TextField
                  label="Objetivos"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register("objetivos", { required: true })}
                  error={!!errors.objetivos}
                />
              </Grid>
            </Grid>

            {/* Líder de Proyecto */}
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12}>
                <label className="col-form-label">Líder de Proyecto</label>
                <FormControl fullWidth error={!!errors.liderProyecto}>
                  <InputLabel>Líder de Proyecto</InputLabel>
                  <Select
                    label="Líder de Proyecto"
                    defaultValue=""
                    {...register("liderProyecto", { required: true })}
                  >
                    <MenuItem value="">
                      <em>Seleccione un líder</em>
                    </MenuItem>
                    {investigadores.map((inv) => (
                      <MenuItem key={inv.curp} value={inv.curp}>
                        {inv.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* ¿Está vinculado? */}
            <Grid container spacing={0} className="p-3" alignItems="center" style={{ gap: '8px' }}>
              <Grid item>
                <FormLabel component="legend" className="col-form-label">
                  ¿Está vinculado?
                </FormLabel>
              </Grid>
              <Grid item>
                <FormControl component="fieldset" error={!!errors.estaVinculado}>
                  <Controller
                    name="estaVinculado"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        {...field}
                        value={field.value || ""}
                      >
                        <FormControlLabel
                          value="Si"
                          control={<Radio />}
                          label="Sí"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* ¿Es un proyecto de desarrollo tecnológico? */}
            <Grid container spacing={0} className="p-3" alignItems="center" style={{ gap: '8px' }}>
              <Grid item>
                <FormLabel component="legend" className="col-form-label">
                  ¿Es un proyecto de desarrollo tecnológico?
                </FormLabel>
              </Grid>
              <Grid item>
                <FormControl component="fieldset" error={!!errors.esDesarrolloTecnologico}>
                  <Controller
                    name="desarrolloTecnologico"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        {...field}
                        value={field.value || ""}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="Sí"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
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
                  onClick={() => navigate("/RegistroProyecto1")}
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

export default RegistroProyecto2;