import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Tooltip,
  Modal,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  Divider,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Backdrop,
  Fade,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  zIndex: 1200,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  zIndex: 1200,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [profileModalOpen, setProfileModalOpen] = React.useState(false);
  const [updateConfirmOpen, setUpdateConfirmOpen] = React.useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    username: "kikin",
    email: "a@a.com",
    password: ""
  });
  const [originalData, setOriginalData] = React.useState({ ...userData });
  const navigate = useNavigate();

  // Simular carga de datos del usuario
  const fetchUserData = () => {
    setLoading(true);

    // Simular tiempo de carga
    setTimeout(() => {
      const simulatedUserData = {
        username: "kikin",
        email: "a@a.com",
        password: ""
      };

      setUserData(simulatedUserData);
      setOriginalData({ ...simulatedUserData });
      setLoading(false);
    }, 800);
  };

  const handleOpenProfile = () => {
    fetchUserData();
    setProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    if (JSON.stringify(userData) !== JSON.stringify(originalData)) {
      setCancelConfirmOpen(true);
    } else {
      setProfileModalOpen(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateProfile = () => {
    setUpdateConfirmOpen(true);
  };

  const confirmUpdate = () => {
    setLoading(true);

    // Validaciones básicas
    if (!userData.username.trim()) {
      setLoading(false);
      return;
    }

    if (!userData.email.trim()) {
      setLoading(false);
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setLoading(false);
      return;
    }

    // Si hay contraseña, validarla
    if (userData.password.trim() && userData.password.length < 6) {
      setLoading(false);
      return;
    }

    // Simular actualización exitosa
    setTimeout(() => {
      const newUserData = {
        username: userData.username.trim(),
        email: userData.email.trim(),
        password: '' // Limpiar contraseña después de actualizar
      };

      setUserData(newUserData);
      setOriginalData({ ...newUserData });

      console.log('Datos actualizados:', newUserData);

      setLoading(false);
      setUpdateConfirmOpen(false);
      setProfileModalOpen(false);
    }, 1000);
  };

  const confirmCancel = () => {
    setUserData({ ...originalData });
    setCancelConfirmOpen(false);
    setProfileModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} />
      <Drawer variant="permanent" open={open}>
        <List style={{ paddingTop: 100 }}>
          {/* Datos del Investigador */}
          <Tooltip title="Datos del Investigador" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={handleOpenProfile}
            >
              <PersonIcon />
            </ListItemButton>
          </Tooltip>
          {/* Convocatorias */}
          <Tooltip title="Convocatorias" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/ConvocatoriasInvestigador")}
            >
              <CampaignIcon />
            </ListItemButton>
          </Tooltip>
          {/* Mis Proyectos */}
          <Tooltip title="Mis Proyectos" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/Proyectos")}
            >
              <AssignmentIcon />
            </ListItemButton>
          </Tooltip>
          {/* Registrar Proyecto */}
          <Tooltip title="Registrar Proyecto" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/RegistroProyecto1")}
            >
              <AddCircleOutlineIcon />
            </ListItemButton>
          </Tooltip>
          {/* Captura de Documentos */}
          <Tooltip title="Captura de Documentos" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/Detalles/Archivos")}
            >
              <DescriptionIcon />
            </ListItemButton>
          </Tooltip>
        </List>
      </Drawer>

      {/* Modal de Perfil Mejorado */}
      <Modal
        open={profileModalOpen}
        onClose={handleCloseProfile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        }}
      >
        <Fade in={profileModalOpen}>
          <Card sx={{
            width: 480,
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            backgroundColor: 'white',
            position: 'relative',
            zIndex: 2001,
          }}>
            <CardContent sx={{ p: 0 }}>
              {/* Header del Modal */}
              <Box sx={{
                backgroundColor: '#1B396A',
                color: 'white',
                p: 3,
                position: 'relative',
                textAlign: 'center'
              }}>
                <IconButton
                  onClick={handleCloseProfile}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                  disabled={loading}
                >
                  <CloseIcon />
                </IconButton>

                <Avatar sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  fontSize: '2rem'
                }}>
                  <PersonIcon fontSize="large" />
                </Avatar>

                <Typography variant="h5" component="h2" fontWeight="bold">
                  Datos del Investigador
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                  Actualiza tu información personal
                </Typography>
              </Box>

              {/* Contenido del Formulario */}
              <Box sx={{ p: 4 }}>
                {loading ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography>Cargando datos del usuario...</Typography>
                  </Box>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Nombre de Usuario"
                      value={userData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      margin="normal"
                      variant="outlined"
                      disabled={loading}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon sx={{ color: '#1B396A' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&:hover fieldset': {
                            borderColor: '#1B396A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1B396A',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1B396A',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      margin="normal"
                      variant="outlined"
                      disabled={loading}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: '#1B396A' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&:hover fieldset': {
                            borderColor: '#1B396A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1B396A',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1B396A',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Nueva Contraseña"
                      type="password"
                      value={userData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      margin="normal"
                      variant="outlined"
                      placeholder="Dejar en blanco para mantener la actual"
                      disabled={loading}
                      helperText="Mínimo 6 caracteres. Dejar vacío para no cambiar."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: '#1B396A' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&:hover fieldset': {
                            borderColor: '#1B396A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1B396A',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#1B396A',
                        },
                      }}
                    />

                    <Divider sx={{ my: 3 }} />

                    {/* Botones de Acción */}
                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'flex-end',
                      flexWrap: 'wrap'
                    }}>
                      <Button
                        variant="outlined"
                        onClick={handleCloseProfile}
                        size="large"
                        startIcon={<CloseIcon />}
                        disabled={loading}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1,
                          fontWeight: 'bold',
                          borderColor: '#1B396A',
                          color: '#1B396A',
                          '&:hover': {
                            backgroundColor: 'rgba(27, 57, 106, 0.04)',
                            borderColor: '#1B396A',
                          }
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleUpdateProfile}
                        size="large"
                        startIcon={<SaveIcon />}
                        disabled={loading}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1,
                          fontWeight: 'bold',
                          backgroundColor: '#1B396A',
                          '&:hover': {
                            backgroundColor: '#153056',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(27, 57, 106, 0.3)',
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        {loading ? 'Actualizando...' : 'Actualizar'}
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Modal>

      {/* Modal de Confirmación de Actualización Mejorado */}
      <Dialog
        open={updateConfirmOpen}
        onClose={() => !loading && setUpdateConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        sx={{ zIndex: 2100 }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            width: '350px',
            maxHeight: '400px'
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          p: 2,
          backgroundColor: '#1B396A',
          color: 'white',
          fontWeight: 'bold',
          position: 'relative'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Avatar sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 45,
              height: 45
            }}>
              <CheckCircleIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" fontSize="1rem">
              Confirmar Actualización
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{
          pt: '60px',
          pb: 2,
          textAlign: 'center',
          backgroundColor: 'white',
          px: 3
        }}>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, color: '#1B396A', fontWeight: 'bold' }}>
            ¿Confirma los cambios realizados?
          </Typography>
          <DialogContentText sx={{
            fontSize: '0.85rem',
            color: 'text.primary',
            lineHeight: 1.3
          }}>
            Esta acción guardará los cambios de forma permanente.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          p: 2.5,
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'white'
        }}>
          <Button
            onClick={() => setUpdateConfirmOpen(false)}
            variant="outlined"
            size="medium"
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 2.5,
              py: 1,
              borderColor: '#1B396A',
              color: '#1B396A',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              '&:hover': {
                backgroundColor: 'rgba(27, 57, 106, 0.05)',
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmUpdate}
            variant="contained"
            autoFocus
            size="medium"
            startIcon={<SaveIcon fontSize="small" />}
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 2.5,
              py: 1,
              backgroundColor: '#1B396A',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              '&:hover': {
                backgroundColor: '#153056',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(27, 57, 106, 0.3)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Guardando...' : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Confirmación de Cancelación Mejorado */}
      <Dialog
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        sx={{ zIndex: 2100 }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            width: '350px',
            maxHeight: '400px'
          }
        }}
      >
        <DialogTitle sx={{
          textAlign: 'center',
          p: 2,
          backgroundColor: '#1B396A',
          color: 'white',
          fontWeight: 'bold',
          position: 'relative'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Avatar sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 45,
              height: 45
            }}>
              <WarningIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" fontSize="1rem">
              Descartar Cambios
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{
          pt: '60px',
          pb: 2,
          textAlign: 'center',
          backgroundColor: 'white',
          px: 3
        }}>
          <Typography variant="body1" sx={{ mt: 2, mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
            ¿Descartar los cambios?
          </Typography>
          <DialogContentText sx={{
            fontSize: '0.85rem',
            color: 'text.primary',
            lineHeight: 1.3
          }}>
            Se perderán todas las modificaciones realizadas.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          p: 2.5,
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'white'
        }}>
          <Button
            onClick={() => setCancelConfirmOpen(false)}
            variant="outlined"
            size="medium"
            sx={{
              borderRadius: 2,
              px: 2.5,
              py: 1,
              borderColor: '#1B396A',
              color: '#1B396A',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              minWidth: '110px',
              '&:hover': {
                backgroundColor: 'rgba(27, 57, 106, 0.05)',
              }
            }}
          >
            Continuar
          </Button>
          <Button
            onClick={confirmCancel}
            variant="contained"
            autoFocus
            size="medium"
            startIcon={<CloseIcon fontSize="small" />}
            sx={{
              borderRadius: 2,
              px: 2.5,
              py: 1,
              backgroundColor: '#d32f2f',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              minWidth: '110px',
              '&:hover': {
                backgroundColor: '#c62828',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Descartar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SideBar;