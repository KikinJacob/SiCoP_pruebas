import React, { useEffect, useState } from "react";
import { getCarreras } from "../api/carrera.api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar_Detalles from "../components/SideBar_Detalles";
import Footer from "../components/Footer";
import { createInvestigador } from "../api/Investigadores.api";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  styled,
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

function InvRegistro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await createInvestigador(data);
    console.log(res);
    navigate("/Detalles/Investigadores");
  });

  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    getCarreras()
      .then(data => setCarreras(data))
      .catch(error => {
        console.error("Error al obtener carreras:", error);
        setCarreras([]);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ display: "flex", flexGrow: 1, mt: 5, mb: 8 }}>
        <SideBar_Detalles />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ marginTop: "20px" }}
        >
          <Typography variant="h4" align="center">
            Registro de investigador
          </Typography>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Captura los campos con la información correspondiente, valida la
            información antes de registrar
          </Typography>

          <form onSubmit={onSubmit} style={{ paddingBottom: "80px" }}>
            {/* CURP */}
            <div className="p-3 row" style={{ marginTop: "5px" }}>
              <label
                className="col-sm-2 col-form-label"
                style={{ fontSize: "1.25rem" }}
              >
                CURP
              </label>
              <div className="col-sm-10">
                <TextField
                  label="CURP"
                  variant="outlined"
                  fullWidth
                  placeholder="Ingrese su CURP"
                  inputProps={{ minLength: 18, maxLength: 18 }}
                  {...register("curp", { required: true, pattern: /[A-Z]{4}[0-9]{6}[A-Z]{7}[0-9]{1}/, })}
                  error={!!errors.curp}
                  InputLabelProps={{ style: { fontSize: "1rem" } }}
                  InputProps={{
                    style: { fontSize: "1rem" },
                    endAdornment: errors.curp ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </div>
            </div>

            {/* NOMBRE */}
            <div className="p-3 row">
              <label
                htmlFor="inputNombre"
                className="col-sm-2 col-form-label"
                style={{ fontSize: "1.25rem" }}
              >
                Nombre
              </label>
              <div className="col-sm-10">
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  placeholder="Ingrese su nombre"
                  {...register("name", {
                    required: true,
                    pattern: /[a-zA-Z\s]*/,
                  })}
                  error={!!errors.name}
                  InputLabelProps={{ style: { fontSize: "1rem" } }}
                  InputProps={{
                    style: { fontSize: "1rem" },
                    endAdornment: errors.name ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </div>
            </div>

            {/* APELLIDOS */}
            <div className="p-3 row">
              <label
                htmlFor="inputApellidos"
                className="col-sm-2 col-form-label"
                style={{ fontSize: "1.25rem" }}
              >
                Apellidos
              </label>
              <div className="col-sm-10">
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  placeholder="Ingrese sus apellidos"
                  {...register("last_name", {
                    required: true,
                    pattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/,
                  })}
                  error={!!errors.last_name}
                  InputLabelProps={{ style: { fontSize: "1rem" } }}
                  InputProps={{
                    style: { fontSize: "1rem" },
                    endAdornment: errors.last_name ? (
                      <InputAdornment position="end">
                        <ErrorIcon color="error" />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              </div>
            </div>

            {/* CARRERA */}
            <div className="p-3 row">
              <label
                className="col-sm-2 col-form-label"
                style={{ fontSize: "1.25rem" }}
              >
                Carrera
              </label>
              <div className="col-sm-10">
                <FormControl fullWidth error={!!errors.career}>
                  <InputLabel style={{ fontSize: "1rem" }}>Carrera</InputLabel>
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
                    <MenuItem value="">Selecciona una carrera</MenuItem>
                    {carreras.map((carrera) => (
                      <MenuItem key={carrera.claveCarrera ?? carrera.id} value={carrera.claveCarrera ?? carrera.id}>
                        {carrera.nombreCarrera}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </FormControl>
              </div>
            </div>

            {/* BOTONES */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                style={{
                  marginLeft: "10px",
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
                  marginRight: "10px",
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
            </div>
          </form>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default InvRegistro;
