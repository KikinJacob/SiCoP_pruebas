import React, { useState, useEffect } from "react";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button as MuiButton } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
        <Typography variant="h3" sx={{}}>
          Lineas de Investigación
        </Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
        >
          <Link to={"/Administracion/RegistroLGAC"} className="text-white link-underline-primary">
            <AddIcon sx={{ mr: 1 }} />
            Agregar nueva
          </Link>
        </Fab>
        <TableViewer columns={columns} rows={rows} />
      </div>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDelete} color="secondary">
            Cancelar
          </MuiButton>
          <MuiButton onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CrudLGAC;