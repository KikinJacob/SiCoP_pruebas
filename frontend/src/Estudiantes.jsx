import React, { useEffect, useState } from "react";
import { Box, Fab, Typography, Button, Grid, Tooltip, IconButton  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";
import { useRegistroProyecto } from "./components/Context";

function Estudiantes() {
    const navigate = useNavigate();
    const [estudiante, setEstudiantes] = useState([]);
    const { updateProyecto, proyecto } = useRegistroProyecto();

    console.log("Datos del proyecto: ", proyecto);

    useEffect(() => {
        try {
            const fetchEstudiantes = async () => {
                let seleccionados = [];
                const data = localStorage.getItem("estudiantesSeleccionados");
                console.log(data);
                if (data) {
                    try {
                        seleccionados = JSON.parse(data);
                    } catch (error) {
                        seleccionados = [];
                    }
                }
                if (!Array.isArray(seleccionados)) seleccionados = [];

                const dataGrid = seleccionados.map((estudiante) => ({
                    ...estudiante,
                    noControl: estudiante.noControl,
                    nombre: estudiante.nombre,
                    apellidos: estudiante.apellidos,
                    carrera: estudiante.carrera,
                    semestre: estudiante.semestre
                }));
                setEstudiantes(dataGrid);
            };
            fetchEstudiantes();
        } catch (error) {
            console.error("Error al cargar los estudiantes: ", error);
        }
    }, []);

    const handleAgregar = () => {
        localStorage.setItem("estudiantesSeleccionados", JSON.stringify(estudiante));
        navigate("/CrudEstudiantes");
    };

    const handleEliminar = (row) => {
        const eliEstu = estudiante.filter( est => est.noControl !== row.noControl);
        setEstudiantes(eliEstu);
        localStorage.setItem("estudiantesSeleccionados", JSON.stringify(eliEstu));
    };

    // Se eliminó la columna de acciones
    const columns = [
        { field: "noControl", headerName: "No.Control", flex: 1 },
        { field: "nombre", headerName: "Nombre(s)", flex: 1 },
        { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
        { field: "carrera", headerName: "Carrera", flex: 1 },
        { field: "semestre", headerName: "Semestre", flex: 0.4 },
        {
            field: "action", headerName: "Eliminar", flex: 0.4,
            renderCell: (params) => (
                <>
                    <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleEliminar(params.row)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Estudiantes del Proyecto</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                    onClick={handleAgregar}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Añadir Estudiante
                </Fab>
                <TableViewer columns={columns} rows={estudiante} checkboxSelection />
                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Colaboradores")}
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
                            variant="contained"
                            style={{
                                backgroundColor: "#1B396A",
                                color: "#fff",
                                borderRadius: "20px",
                            }}
                            onClick={() => {
                                const estudiantesids = estudiante.map(e => e.id);
                                updateProyecto({ estudiante: estudiantesids });
                                console.log({ estudiante: estudiantesids });
                                navigate("/Empresas")
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#162e54")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#1B396A")
                            }
                        >
                            Siguiente
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default Estudiantes;