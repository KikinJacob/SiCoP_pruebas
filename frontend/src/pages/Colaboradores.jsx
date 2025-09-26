import React, { useEffect } from "react";
import { Box, Fab, Typography, Button, Grid, Tooltip, IconButton, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "../components/TableViewer";
import { getColaboradores } from "../api/Colaboradores.api";
import { useRegistroProyecto } from "../components/Context.jsx";
import { use } from "react";
import { useForm } from "react-hook-form";

function Colaboradores() {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [colaboradores, setColaboradores] = React.useState([]);
    const { updateProyecto } = useRegistroProyecto();

    // LLAMADA A LA API PARA OBTENER A LOS COLABORADORES

    useEffect(() => {
        const fetchColaboradores = async () => {
            let seleccionados = [];
            const seleccionadosRaw = localStorage.getItem("colaboradoresSeleccionados");
            if (seleccionadosRaw) {
                try {
                    seleccionados = JSON.parse(seleccionadosRaw);
                } catch (e) {
                    seleccionados = [];
                }
            }

            const todos = [
                ...seleccionados.map((colaborador) => ({
                    id: colaborador.curp,
                    curp: colaborador.curp,
                    nombre: colaborador.nombre,
                    apellidos: colaborador.apellidos,
                    carrera: colaborador.carrera,
                })),
            ];

            setColaboradores(todos);
            console.log(todos);
        };
        fetchColaboradores();
    }, []);

    const handleAgregar = () => {
        localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(colaboradores));
        navigate("/CrudColaboradores");
    };

    const handleEliminarCola = (row) => {
        console.log(row);
        const eliColaboradores = colaboradores.filter((cola) => cola.curp !== row.curp);
        setColaboradores(eliColaboradores);
        localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(eliColaboradores));
    }

    const onSubmit = handleSubmit((data) => {
        updateProyecto({ data });
        console.log(data);
        navigate("/Estudiantes");
    });

    const columns = [
        { field: "curp", headerName: "CURP", flex: 1 },
        { field: "nombre", headerName: "Nombre(s)", flex: 1 },
        { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
        { field: "carrera", headerName: "Carrera", flex: 1 },
        {
            field: "action", headerName: "Eliminar", flex: 0.3,
            renderCell: (params) => (
                <>
                    <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleEliminarCola(params.row)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )
        },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Colaboradores del Proyecto</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                    onClick={handleAgregar}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Añadir Colaborador
                </Fab>
                <TableViewer columns={columns} rows={colaboradores} />
                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Detalles/Metas")}
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
                            type="submit"
                            style={{
                                backgroundColor: "#1B396A",
                                color: "#fff",
                                borderRadius: "20px",
                            }}
                            onClick={() => {
                                const colaboradorescurp = colaboradores.map(e => e.curp);
                                updateProyecto({ colaboradores: colaboradorescurp });
                                console.log(colaboradorescurp);
                                navigate("/Estudiantes");
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

export default Colaboradores;