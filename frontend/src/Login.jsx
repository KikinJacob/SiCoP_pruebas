import React, { useState, useEffect } from "react";
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
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "./components/Footer";
import { doLogin, checkRol } from "./api/Credenciales.api";

function CarouselNoticias() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsImages, setNewsImages] = useState([]);

  // Función para cargar dinámicamente todas las imágenes de la carpeta imgs
  const loadImages = () => {
    try {
      // Usar import.meta.glob para cargar dinámicamente las imágenes
      const imageModules = import.meta.glob('./imgs/*.{png,jpg,jpeg,svg,webp}', { eager: true });

      const images = Object.entries(imageModules).map(([path, module], index) => {
        const fileName = path.split('/').pop().split('.')[0]; // Extraer nombre del archivo sin extensión
        return {
          id: index + 1,
          src: module.default,
          alt: `Imagen ${index + 1}`,
          title: `Noticia ${index + 1}`,
          description: `Información sobre ${fileName.replace(/[-_]/g, ' ')}`
        };
      });

      setNewsImages(images);
    } catch (error) {
      console.log('No se pudieron cargar las imágenes:', error);
      // Fallback con imágenes por defecto
      setNewsImages([
        {
          id: 1,
          src: null,
          alt: "Sin imagen",
          title: "Noticias del Sistema",
          description: "Mantente informado sobre las últimas actualizaciones del sistema"
        }
      ]);
    }
  };

  // Cargar imágenes al montar el componente
  useEffect(() => {
    loadImages();
  }, []);

  const nextSlide = () => {
    if (newsImages.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % newsImages.length);
    }
  };

  const prevSlide = () => {
    if (newsImages.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + newsImages.length) % newsImages.length);
    }
  };

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    if (newsImages.length > 1) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [newsImages]);

  // Mostrar estado de carga mientras se cargan las imágenes
  if (newsImages.length === 0) {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 400,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            border: '4px solid #667eea',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            mb: 2,
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
        <Typography variant="body1" color="textSecondary">
          Cargando noticias...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 3,
        backgroundColor: '#f5f5f5'
      }}
    >
      {/* Slides Container */}
      <Box
        sx={{
          display: 'flex',
          width: `${newsImages.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(currentSlide * 100) / newsImages.length}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {newsImages.map((image, index) => (
          <Box
            key={image.id}
            sx={{
              width: `${100 / newsImages.length}%`,
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5'
            }}
          >
            {/* Imagen ocupando todo el contenedor */}
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  // Fallback si la imagen no carga
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 4rem; background-color: #f5f5f5;">📰</div>';
                }}
              />
            ) : (
              <Box
                sx={{
                  fontSize: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  color: '#666'
                }}
              >
                📰
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 15,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1
        }}
      >
        {newsImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showErrorModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setSuccessModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  // LOGICA PARA SABER SI ESTA REGISTRADO EN LA PLATAFORMA
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const user = await doLogin(data.usuario, data.password);
      // console.log(user);
      if (user) {
        const rol = await checkRol();
        showSuccessModal("¡Inicio de sesión exitoso! Redirigiendo...");

        // Esperar 2 segundos para mostrar el modal antes de redirigir
        setTimeout(() => {
          if (rol.Rol === "Administrador") {
            navigate("/Administracion/Proyectos");
          } else {
            navigate("/Proyectos");
          }
        }, 2000);
      } else {
        showErrorModal("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      showErrorModal("Error al intentar iniciar sesión");
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

      {/* Modal de Error con Animaciones */}
      <Modal
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <Fade in={modalOpen} timeout={500}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              border: 'none',
              outline: 'none',
              animation: 'bounce 0.6s ease-out',
              '@keyframes bounce': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(0.3)',
                  opacity: 0,
                },
                '50%': {
                  transform: 'translate(-50%, -50%) scale(1.05)',
                },
                '70%': {
                  transform: 'translate(-50%, -50%) scale(0.9)',
                },
                '100%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                  opacity: 1,
                },
              },
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#666',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                animation: 'shake 0.8s ease-in-out infinite',
                '@keyframes shake': {
                  '0%, 100%': { transform: 'rotate(0deg)' },
                  '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-5deg)' },
                  '20%, 40%, 60%, 80%': { transform: 'rotate(5deg)' },
                },
              }}
            >
              <SentimentVeryDissatisfiedIcon
                sx={{
                  fontSize: 80,
                  color: '#f44336',
                  mb: 2,
                }}
              />
            </Box>

            <Typography
              id="error-modal-title"
              variant="h5"
              component="h2"
              sx={{
                mb: 2,
                color: '#f44336',
                fontWeight: 'bold',
              }}
            >
              ¡Oops! Error
            </Typography>

            <Typography
              id="error-modal-description"
              variant="body1"
              sx={{
                mb: 3,
                color: '#666',
                fontSize: '1.1rem',
              }}
            >
              {modalMessage}
            </Typography>

            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                backgroundColor: '#f44336',
                color: '#fff',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Entendido
            </Button>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de Éxito con Animaciones */}
      <Modal
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <Fade in={successModalOpen} timeout={500}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 400 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              border: 'none',
              outline: 'none',
              animation: 'bounceIn 0.8s ease-out',
              '@keyframes bounceIn': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(0.3) rotate(-10deg)',
                  opacity: 0,
                },
                '50%': {
                  transform: 'translate(-50%, -50%) scale(1.1) rotate(5deg)',
                  opacity: 0.8,
                },
                '70%': {
                  transform: 'translate(-50%, -50%) scale(0.9) rotate(-2deg)',
                  opacity: 0.9,
                },
                '100%': {
                  transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                  opacity: 1,
                },
              },
            }}
          >
            <IconButton
              onClick={handleCloseSuccessModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#666',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 80,
                  color: '#4caf50',
                  mb: 2,
                  filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.3))',
                }}
              />
            </Box>

            <Typography
              id="success-modal-title"
              variant="h5"
              component="h2"
              sx={{
                mb: 2,
                color: '#4caf50',
                fontWeight: 'bold',
                animation: 'slideUp 0.6s ease-out 0.3s both',
                '@keyframes slideUp': {
                  '0%': {
                    transform: 'translateY(30px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              {/* ¡Perfecto! 🎉 */}
            </Typography>

            <Typography
              id="success-modal-description"
              variant="body1"
              sx={{
                mb: 3,
                color: '#666',
                fontSize: '1.1rem',
                animation: 'slideUp 0.6s ease-out 0.5s both',
                '@keyframes slideUp': {
                  '0%': {
                    transform: 'translateY(30px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              {successMessage}
            </Typography>

            {/* Loading spinner para mostrar que está redirigiendo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                animation: 'slideUp 0.6s ease-out 0.7s both',
                '@keyframes slideUp': {
                  '0%': {
                    transform: 'translateY(30px)',
                    opacity: 0,
                  },
                  '100%': {
                    transform: 'translateY(0)',
                    opacity: 1,
                  },
                },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  border: '2px solid #4caf50',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#4caf50',
                  fontWeight: 'medium',
                }}
              >
                Cargando...
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}