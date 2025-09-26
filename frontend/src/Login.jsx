import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Box,
  CssBaseline,
  Paper,
  IconButton,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Footer from "./components/Footer";
import { doLogin, checkRol } from "./api/Credenciales.api";

function CarouselNoticias() {
  // ...tu código de CarouselNoticias sin cambios...
  // ...
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // LOGICA PARA SABER SI ESTA REGISTRADO EN LA PLATAFORMA
const onSubmit = async (data) => {
  // console.log(data);
    try {
      const user = await doLogin(data.usuario, data.password);
      // console.log(user);
      if (user) {
        const rol = await checkRol();
        if(rol.Rol === "Administrador"){
          navigate("/Administracion/Proyectos");
        } else {
          navigate("/Proyectos");
        }
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      alert("Error al intentar iniciar sesión.");
    }
};

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 6 },
              borderRadius: 3,
              minHeight: { xs: 400, sm: 500 },
              minWidth: { xs: 320, sm: 700, md: 900 },
              maxWidth: "100%",
            }}
          >
            <Grid container spacing={6} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Box sx={{ px: { xs: 0, sm: 4 } }}>
                  <Typography variant="h4" align="center" sx={{ mt: 2, mb: 4 }}>
                    Iniciar Sesión
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="col-form-label" style={{ fontSize: "1.1rem" }}>
                      Usuario
                    </label>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su usuario"
                      {...register("usuario", { required: true })}
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
                      sx={{ mb: 3 }}
                    />

                    <label className="col-form-label" style={{ fontSize: "1.1rem" }}>
                      Contraseña
                    </label>
                    <TextField
                      // label="Contraseña"
                      variant="outlined"
                      fullWidth
                      placeholder="Ingrese su contraseña"
                      type="password"
                      {...register("password", { required: true })}
                      error={!!errors.password}
                      InputLabelProps={{ style: { fontSize: "1rem" } }}
                      InputProps={{
                        style: { fontSize: "1rem" },
                        endAdornment: errors.password ? (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        ) : null,
                      }}
                      sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#1B396A",
                          color: "#fff",
                          borderRadius: "20px",
                          "&:hover": {
                            backgroundColor: "#162e54",
                          },
                          mt: 2,
                          px: 4,
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                  Noticias
                </Typography>
                <CarouselNoticias />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}