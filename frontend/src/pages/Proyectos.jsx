import React, { useEffect, useState } from "react";
import TableViewer from "../components/TableViewer";
import { Box, Fab, Typography, Button } from "@mui/material";
import SideBar from "../components/SideBar";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem, gridRowsDataRowIdToIdLookupSelector } from "@mui/x-data-grid";
import { chechSession } from "../api/Credenciales.api.js";
import { getAllEmpresas } from "../api/Empresa.api.js";
import { getProyecto, getProyectosInvestigador } from "../api/Proyectos.api.js";

const STORAGE_KEY = "proyectosRows";
const EDITABLES_KEY = "proyectosEditables";

export default function Proyectos() {
  const [rows, setRows] = useState([]);
  const [editables, setEditables] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  // CARGAR LOS PROYECTOS EN LOS CAMPOS CORRESPONDIENTES
  useEffect(() => {
    try {
      const fetchProyectos = async () => {
        const dataSession = await chechSession();
        if (!dataSession) {
          navigate("/");
          return;
        }

        let data;

        if(dataSession.rol == "Administrador"){
          data = await getProyecto();
        } else {
          data = await getProyectosInvestigador();
        }

        const rowsWithId = data.map((proyecto) => ({
          ...proyecto,
          id: proyecto.claveInterna,
          Nombre: proyecto.nombreProyecto,
          Empresa: proyecto.empresa_nombre,
          LGAC: proyecto.linea_investigacion_nombre,
          Lider: proyecto.liderProyecto,
          Estatus: proyecto.estatusProyecto,
          action: proyecto.action
        }));
        console.log("Datos: ", data);
        setRows(rowsWithId);
      };
      fetchProyectos();
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  }, []);

  const handleEdit = async (id) => {
    try {
      const data = await getProyecto(id);
      console.log(data);
      navigate("/EditarProyecto", { state: { proyecto: data}});
    } catch (error) {
      console.error("Error en editar el proyecto: ", error)
    }
  };

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
          disabled
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
      field: "Acciones",
      type: "actions",
      headerName: "Acciones",
      width: 120,
      getActions: ({ id }) => {
        const row = rows.find(r => r.id === id);
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Modificar"
            sx={{ color: row && row.action ? "primary.main" : "grey.500" }}
            onClick={() => row && row.action && handleEdit(row.claveInterna)}
            disabled={!(row && row.action)}
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <nav>
        <SideBar />
      </nav>
      <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
        <Typography variant="h3">Mis Proyectos</Typography>
        <Fab
          variant="extended"
          color="primary"
          sx={{ right: "-82vw", marginBottom: "10px" }}
        >
          <Link to={"/RegistroProyecto1"} className="text-white link-underline-primary">
            <AddIcon sx={{ mr: 1 }} />
            Registrar proyecto
          </Link>
        </Fab>
        <TableViewer columns={columns} rows={rows} />
      </div>
    </Box>
  );
}