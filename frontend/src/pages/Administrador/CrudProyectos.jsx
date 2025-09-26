import React, { useEffect, useState } from "react";
import { getProyectos, editEstatusProyecto, editActionProyecto } from "../../api/Proyectos.api";
import TableViewer from "../../components/TableViewer";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { chechSession, checkRol } from "../../api/Credenciales.api";

const STORAGE_KEY = "proyectosRows";
const EDITABLES_KEY = "proyectosEditables";

function CrudProyectos() {
  const [rows, setRows] = useState([]);
  const [editables, setEditables] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  
  // VERIFICA QUE EL USUARIO SI ESTE LOGUEADO Y QUE SU ROL SI CORRESPONDA A LA PAGINA
  useEffect(() => {
    const init = async () => {
      try {
        const isLoggedIn = await chechSession();
        const rol = await checkRol();

        if (!isLoggedIn || rol.Rol !== "Administrador") {
          navigate("/");
          return;
        }
        const data = await getProyectos();
        const rowsWithId = data.map((proyecto) => ({
          ...proyecto,
          id: proyecto.claveInterna,
          Nombre: proyecto.nombreProyecto,
          Empresa: proyecto.empresa_nombre,
          LGAC: proyecto.linea_investigacion_nombre,
          Lider: proyecto.liderProyecto,
          Estatus: proyecto.estatusProyecto,
          Action: proyecto.action
        }));
        setRows(rowsWithId);
      } catch (error) {
        console.error("Error al verificar los datos o cargar los proyectos", error);
      }
    };
    init();
  }, [navigate]);

  // Guardar editables en localStorage
  useEffect(() => {
    localStorage.setItem(EDITABLES_KEY, JSON.stringify(editables));
  }, [editables]);

  // Cambia el estatus de un proyecto y sincroniza con localStorage
  const handleToggleEstatus = async (id) => {
    const proyectoActual = rows.find((row) => row.id === id);
    if (!proyectoActual) return;

    const nuevoEstatus = proyectoActual.Estatus === "Activo" ? "Inactivo" : "Activo";

    try {
      await editEstatusProyecto(id, nuevoEstatus);

      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row.id === id ? { ...row, Estatus: nuevoEstatus } : row
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRows));
        return updatedRows;
      });
    } catch (error) {
      alert("No se pudo actualizar el estatus en el servidor.");
    }
  };

  // Abre el modal de confirmación para editar
  const handleEditModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  // Confirma la edición y alterna el estado editable
  const confirmToggleEditable = async () => {
    const proyecto = rows.find((row) => row.id === selectedId);
    if (!proyecto) return;

    const nuevoAction = !proyecto.action;

    try {
      console.log(nuevoAction);
      await editActionProyecto(selectedId, nuevoAction);

      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row.id === selectedId ? { ...row, action: nuevoAction } : row
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRows));
        return updatedRows;
      });
      setEditables((prev) => ({
        ...prev,
        [selectedId]: nuevoAction,
      }));
    } catch (error) {
      alert("No se pudo actualizar la acción en el servidor.");
    }
    setModalOpen(false);
    setSelectedId(null);
  };

  // Cancela el modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  // Navega a EditarProyectos con los datos del proyecto seleccionado
  const handleEdit = (row) => {
    navigate("/EditarProyecto", { state: { proyecto: row } });
  };

  // Definición de las columnas de la tabla (sin columna de acciones)
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "Nombre", headerName: "Nombre(s)", flex: 1 },
    { field: "Empresa", headerName: "Empresa", flex: 1 },
    { field: "LGAC", headerName: "LGAC", flex: 1 },
    { field: "Lider", headerName: "Líder", flex: 1 },
    {
      field: "Estatus",
      headerName: "Estatus",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleToggleEstatus(params.row.id)}
          sx={{
            minWidth: 150,
            height: 36,
            backgroundColor: params.row.Estatus === "Activo" ? "#1976d2" : "#757575",
            color: "#fff",
            "&:hover": {
              backgroundColor: params.row.Estatus === "Activo" ? "#115293" : "#616161",
            },
            textTransform: "none",
            fontWeight: 600,
            padding: 0,
          }}
        >
          {params.row.Estatus === "Activo" ? "Activo" : "Inactivo"}

        </Button>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleEditModal(params.row.id)}
          sx={{
            minWidth: 150,
            height: 36,
            backgroundColor: params.row.action ? "#1976d2" : "#757575",
            color: "#fff",
            "&:hover": {
              backgroundColor: params.row.action ? "#115293" : "#616161",

            },
            textTransform: "none",
            fontWeight: 600,
            padding: 0,
          }}
        // disabled={!params.row.action}
        >
          Editar
        </Button>
      ),
    }
  ];

  // Carga de datos de ejemplo o desde localStorage
  // useEffect(() => {
  //   const stored = localStorage.getItem(STORAGE_KEY);
  //   if (stored) {
  //     setRows(JSON.parse(stored));
  //   } else {
  //     const mockProjects = [
  //       {
  //         id: 1,
  //         Nombre: "Sistema de Gestión de Inventarios",
  //         Empresa: "Tech Solutions S.A.",
  //         LGAC: "Innovación Tecnológica",
  //         Lider: "Juan Pérez",
  //         Estatus: "Completado",
  //       },
  //       {
  //         id: 2,
  //         Nombre: "Plataforma de E-Learning",
  //         Empresa: "EducaOnline",
  //         LGAC: "Educación Digital",
  //         Lider: "María Gómez",
  //         Estatus: "No Completado",
  //       },
  //       {
  //         id: 3,
  //         Nombre: "Aplicación Móvil de Salud",
  //         Empresa: "HealthCare Inc.",
  //         LGAC: "Tecnología Médica",
  //         Lider: "Carlos Rodríguez",
  //         Estatus: "Completado",
  //       },
  //       {
  //         id: 4,
  //         Nombre: "Automatización de Procesos",
  //         Empresa: "AutoSys Corp.",
  //         LGAC: "Automatización Industrial",
  //         Lider: "Ana López",
  //         Estatus: "No Completado",
  //       },
  //       {
  //         id: 5,
  //         Nombre: "Sistema de Monitoreo Ambiental",
  //         Empresa: "GreenTech",
  //         LGAC: "Sostenibilidad",
  //         Lider: "Luis Martínez",
  //         Estatus: "Completado",
  //       },
  //     ];
  //     setRows(mockProjects);
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
  //   }
  // }, []);

  // Encuentra el nombre del proyecto seleccionado para el modal
  const selectedProject = rows.find((row) => row.id === selectedId);

  return (
    <Box>
      <nav>
        <SideBarAdmin />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3">Proyectos</Typography>
        <TableViewer columns={columns} rows={rows} />
      </div>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          ¿Desea {editables[selectedId] ? "desactivar" : "activar"} la edición para el proyecto <b>{selectedProject?.Nombre}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
          <Button onClick={confirmToggleEditable} color="primary" variant="contained">
            Sí, {editables[selectedId] ? "desactivar" : "activar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CrudProyectos;