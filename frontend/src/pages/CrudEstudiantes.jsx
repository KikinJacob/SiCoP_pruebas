import React, { useEffect, useState } from "react";
import { Box, Fab, Typography, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "../components/TableViewer";
import { getEstudiantes } from "../api/Estudiante.api";
import { getCarreras } from "../api/carrera.api";

function CrudEstudiantes() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        getCarreras().then((carrerasData) => {
            setCarreras(carrerasData);

            getEstudiantes()
                .then((data) => {
                    const mappedRows = data.map((item, idx) => {
                        const carreraObj = carrerasData.find(
                            c => c.claveCarrera === item.claveCarrera
                        );
                        return {
                            id: item.noControl,
                            noControl: item.noControl,
                            nombre: item.nombre,
                            apellidos: item.apellidos,
                            carrera: carreraObj ? carreraObj.nombreCarrera : "",
                            semestre: item.semestre,
                        };
                    });

                    let seleccionados = [];
                    const estudiantesSeleccionados = localStorage.getItem("estudiantesSeleccionados");

                    if (estudiantesSeleccionados) {
                        try {
                            seleccionados = JSON.parse(estudiantesSeleccionados);
                        } catch (error) {
                            seleccionados = [];
                        }
                    }

                    const todos = mappedRows.filter(estudiante => !seleccionados.some(sel => sel.noControl === estudiante.noControl)).map((estudiante) => ({
                        id: estudiante.noControl,
                        noControl: estudiante.noControl,
                        nombre: estudiante.nombre,
                        apellidos: estudiante.apellidos,
                        carrera: estudiante.carrera,
                        semestre: estudiante.semestre,
                    }));

                    setRows(todos);
                })
                .catch((error) => {
                    setRows([]);
                    console.error("Error al obtener estudiantes:", error);
                });
        });
    }, []);

    const handleAgregar = () => {
        const seleccionadosNuevos = rows.filter(col => selectedIds.includes(col.id));
        console.log("Estudiantes seleccionados: ", seleccionadosNuevos);

        let existentes = [];
        const prev = localStorage.getItem("estudiantesSeleccionados");
        if (prev) {
            try {
                existentes = JSON.parse(prev);
            } catch (e) {
                existentes = [];
            }
        }

        // Filtra para no repetir estudiantes ya guardados (por noControl)
        const nuevosUnicos = seleccionadosNuevos.filter(nuevo =>
            !existentes.some(est => est.noControl === nuevo.noControl)
        );

        const todos = [...existentes, ...nuevosUnicos];

        // console.log("Todos los estudiantes",todos);

        localStorage.setItem("estudiantesSeleccionados", JSON.stringify(todos));
        navigate(-1);
    };

    const columns = [
        { field: "noControl", headerName: "No.Control", flex: 1 },
        { field: "nombre", headerName: "Nombre(s)", flex: 1 },
        { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
        { field: "carrera", headerName: "Carrera", flex: 1 },
        { field: "semestre", headerName: "Semestre", flex: 1 },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Estudiantes</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                >
                    <Link to={"/RegistroAlumnos"} className="text-white link-underline-primary">
                        <AddIcon sx={{ mr: 1 }} />
                        Registrar Estudiante
                    </Link>
                </Fab>
                <TableViewer columns={columns} rows={rows} checkboxSelection onSelectionModelChange={(ids) => {
                    console.log("IDs seleccionados: ", ids);
                    setSelectedIds(ids);
                }} />
                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            style={{
                                borderColor: "#1B396A",
                                color: "#1B396A",
                                borderRadius: "20px",
                            }}
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
                            onClick={handleAgregar}
                        >
                            Agregar
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default CrudEstudiantes;