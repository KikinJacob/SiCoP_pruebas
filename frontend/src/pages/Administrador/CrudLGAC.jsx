import React, { useState, useEffect } from "react";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button as MuiButton, Avatar } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import { Link, useNavigate } from "react-router-dom";
import { getLineasInv, deleteLineaInv } from "../../api/LineaInv.api";
import { getCarreras } from "../../api/carrera.api";
import { chechSession, checkRol } from "../../api/Credenciales.api";

function CrudLGAC() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [carreras, setCarreras] = useState([]);

  // Cargar carreras y luego líneas
  useEffect(() => {
    const fetchDatos = async () => {
      const isLoggedIn = await chechSession();
      const rol = await checkRol();

      if (!isLoggedIn || rol.Rol !== "Administrador") {
        navigate("/");
        return;
      }
      getCarreras().then((carrerasData) => {
        setCarreras(carrerasData);
        fetchLineas(carrerasData);
      });
      // eslint-disable-next-line
    }
    fetchDatos();
  }, []);

  const fetchLineas = (carrerasData) => {
    getLineasInv()
      .then(data => {
        const mappedRows = data.map((item, idx) => {
          // Buscar el nombre de la carrera por id
          const carreraObj = carrerasData.find(c => c.claveCarrera === item.claveCarrera);
          return {
            id: item.idLineaInvestigacion || idx + 1,
            Nombre: item.nombre,
            Carrera: carreraObj ? carreraObj.nombreCarrera : "", // Mostrar nombre de carrera
            Instituto: item.institucionRegistro || "",
            idLineaInvestigacion: item.idLineaInvestigacion,
          };
        });
        setRows(mappedRows);
      })
      .catch(() => setRows([]));
  };

  const handleDeleteClick = (id) => {
    setRowToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setRowToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteLineaInv(rowToDelete);
      setRows(rows.filter((row) => row.id !== rowToDelete));
    } catch (error) {
      alert("Error al eliminar la línea");
    }
    setOpenDelete(false);
    setRowToDelete(null);
  };

  // Editar: navega y pasa solo el id de la línea seleccionada al formulario
  const handleEditClick = (id) => {
    const row = rows.find((r) => r.id === id);
    if (row) {
      navigate("/Administracion/RegistroLGAC", { state: { idLineaInvestigacion: row.idLineaInvestigacion } });
    }
  };

  const columns = [
    { field: "id", headerName: "id", flex: 1 },
    { field: "Nombre", headerName: "Nombre(s)", flex: 1 },
    { field: "Carrera", headerName: "Carrera", flex: 1 },
    { field: "Instituto", headerName: "Instituto", flex: 1 },
    {
      field: "Acciones",
      type: "actions",
      headerName: "Acciones",
      width: 160,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          sx={{ color: "primary.main" }}
          onClick={() => handleEditClick(id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => handleDeleteClick(id)}
          color="error"
        />,
      ],
    },
  ];

  return (
    <Box>
      <nav>
        <SideBarAdmin />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3" sx={{ marginBottom: '20px' }}>
          Lineas de Investigación
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Fab
            variant="extended"
            color="primary"
          >
            <Link to={"/Administracion/RegistroLGAC"} className="text-white link-underline-primary">
              <AddIcon sx={{ mr: 1 }} />
              Agregar nueva
            </Link>
          </Fab>
        </Box>
        <TableViewer columns={columns} rows={rows} />
      </div>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
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
              Confirmar eliminación
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
            ¿Estás seguro que deseas eliminar este registro?
          </Typography>
          <DialogContentText sx={{
            fontSize: '0.85rem',
            color: 'text.primary',
            lineHeight: 1.3
          }}>
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          p: 2.5,
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'white'
        }}>
          <MuiButton
            onClick={handleCloseDelete}
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
            Cancelar
          </MuiButton>
          <MuiButton
            onClick={handleConfirmDelete}
            variant="contained"
            autoFocus
            size="medium"
            startIcon={<DeleteIcon fontSize="small" />}
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
            Eliminar
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CrudLGAC;