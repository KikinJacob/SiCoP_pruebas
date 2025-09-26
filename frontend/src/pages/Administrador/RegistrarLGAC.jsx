import React, { useEffect, useState } from "react";
import { getCarreras } from "../../api/carrera.api";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
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
import { createLineaInv, updateLineaInv, getLineaInv } from "../../api/LineaInv.api";
import { chechSession, checkRol } from "../../api/Credenciales.api";

function RegistrarLGAC() {
  const navigate = useNavigate();
  const location = useLocation();
  const idLineaInvestigacion = location.state?.idLineaInvestigacion;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [carreras, setCarreras] = useState([]);
  const [carrerasLoaded, setCarrerasLoaded] = useState(false);
  const carreraValue = watch("carrera", "");

  // Cargar carreras 
  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await chechSession();
      const rol = await checkRol();

      if (!isLoggedIn || rol.Rol !== "Administrador") {
        navigate("/");
        return;
      }
      getCarreras()
        .then(data => {
          setCarreras(data);
          setCarrerasLoaded(true);
        })
        .catch(error => {
          console.error("Error al obtener carreras:", error);
          setCarreras([]);
          setCarrerasLoaded(true);
        });
    }
    fetchData();
  }, []);

  // Precargar datos 
  useEffect(() => {
    if (idLineaInvestigacion && carrerasLoaded) {
      getLineaInv(idLineaInvestigacion).then(linea => {
        setValue("nombre", linea.nombre);
        setValue("instituto", linea.institucionRegistro);
        setValue("carrera", linea.claveCarrera);
        setValue("lineaID", linea.idLineaInvestigacion);
      });
    }
  }, [idLineaInvestigacion, setValue, carrerasLoaded]);

  const onSubmit = async (data) => {
    try {
      const datos = {
        ...data,
        claveCarrera: data.carrera,
        idLineaInvestigacion: data.lineaID,
        institucionRegistro: data.instituto,
      };
      delete datos.carrera;
      delete datos.lineaID;
      delete datos.instituto;

      if (idLineaInvestigacion) {
        await updateLineaInv(idLineaInvestigacion, datos);
      } else {
        await createLineaInv(datos);
      }
      navigate("/Administracion/LGAC");
    } catch (error) {
      if (error.response && error.response.data) {
        alert("Error: " + JSON.stringify(error.response.data));
      } else {
        alert("Error al registrar la LGAC");
      }
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 8, mb: 8 }}>
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
            Registro de LGAC
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la información antes de registrar.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Nombre</label>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  {...register("nombre", { required: true })}
                  error={!!errors.nombre}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Instituto de registro</label>
                <TextField
                  label="Instituto de registro"
                  variant="outlined"
                  fullWidth
                  {...register("instituto", { required: true })}
                  error={!!errors.instituto}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className="p-3">
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">Carrera</label>
                <FormControl fullWidth error={!!errors.carrera}>
                  <InputLabel shrink>Carrera</InputLabel>
                  <Controller
                    name="carrera"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Carrera"
                        displayEmpty
                        value={carreraValue}
                        inputProps={{ "aria-label": "Carrera" }}
                      >
                        <MenuItem value="">
                          <em>Selecciona una carrera</em>
                        </MenuItem>
                        {carreras.map((carrera) => (
                          <MenuItem key={carrera.claveCarrera} value={carrera.claveCarrera}>
                            {carrera.nombreCarrera}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label className="col-form-label">LineaID</label>
                <TextField
                  label="LineaID"
                  variant="outlined"
                  fullWidth
                  {...register("lineaID", { required: true })}
                  error={!!errors.lineaID}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className="p-3">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/Administracion/LGAC")}
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

export default RegistrarLGAC;