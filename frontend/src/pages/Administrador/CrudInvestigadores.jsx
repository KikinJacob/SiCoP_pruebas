import React from "react";
import TableViewer from "../../components/TableViewer";
import { Box, Fab, Typography } from "@mui/material";
import SideBarAdmin from "../../components/SideBarAdmin";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { getAllInvestigadores, deleteInvestigador } from "../../api/Investigadores.api";
import { useState } from "react";
import { getCarreras } from "../../api/carrera.api";
import { chechSession, checkRol } from "../../api/Credenciales.api";

const columns = [
  { field: "curp", headerName: "CURP", flex: 1 },
  { field: "nombre", headerName: "Nombre(s)", flex: 1 },
  { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
  { field: "correo", headerName: "Correo", flex: 1 },
  { field: "nombreCarrera", headerName: "Carrera", flex: 1 },
];


function CrudInvestigadores() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  // Cargar los investigadores al montar el componente
  React.useEffect(() => {
    const fetchInvestigadores = async () => {
      const isLoggedIn = await chechSession();
      const rol = await checkRol();

      if (!isLoggedIn || rol.Rol !== "Administrador") {
        navigate("/");
        return;
      }
      const dataCarreras = await getCarreras();
      console.log(dataCarreras);
      getAllInvestigadores().then((data) => {
        const mapCarreras = data.map((item) => {
          const carerraObj = dataCarreras.find(
            c => c.claveCarrera === item.claveCarrera
          );
          return {
            id: item.curp,
            curp: item.curp,
            nombre: item.nombre,
            apellidos: item.apellidos,
            correo: item.correo,
            nombreCarrera: carerraObj ? carerraObj.nombreCarrera : "",
          };
        })
        console.log(mapCarreras);
        setRows(mapCarreras);
      });
    };
    fetchInvestigadores();
  }, []);

  // Agrega la columna de acciones dinámicamente para usar navigate
  const columnsWithNavigate = [
    ...columns,
    {
      field: "Acciones",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          sx={{ color: "primary.main" }}
          onClick={() => navigate(`/Administracion/RegistroInvestigador/${id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => {
            if (window.confirm("¿Estás seguro de que deseas eliminar este investigador?")) {
              deleteInvestigador(id)
                .then(() => {
                  setRows((prevRows) => prevRows.filter((row) => row.curp !== id));
                  alert("Investigador eliminado con éxito");
                })
                .catch((error) => {
                  console.error("Error al eliminar investigador:", error);
                  alert("Error al eliminar investigador");
                });
            }
          }}
          color="error"
        />,
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <nav>
        <SideBarAdmin />
      </nav>
      <Box sx={{ flex: 1, padding: "20px", mt: 7, mb: 7 }}>
        <Typography variant="h3">
          Investigadores
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Fab
            variant="extended" color="primary"
            onClick={() => navigate("/Administracion/RegistroInvestigador")}
          >
            <AddIcon sx={{ mr: 1 }} /> Agregar nuevo
          </Fab>
        </Box>
        <TableViewer columns={columnsWithNavigate} rows={rows} getRowId={(row) => row.curp} />
      </Box>
    </Box>
  );
}

export default CrudInvestigadores;