import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableViewer from "../components/TableViewer";
import { getAllInvestigadores } from "../api/Investigadores.api";
import { getCarreras } from "../api/carrera.api";

function CrudColaboradores() {
    const navigate = useNavigate();
    const [colaboradores, setColaboradores] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [anteColab, setAnteColab] = useState([]);

    useEffect(() => {
        getCarreras().then((carrerasData) => setCarreras(carrerasData));

        const fetchColaboradores = async () => {
            const data = await getAllInvestigadores();
            let seleccionados = [];
            const seleccionadosRaw = localStorage.getItem("colaboradoresSeleccionados");
            if (seleccionadosRaw) {
                try {
                    seleccionados = JSON.parse(seleccionadosRaw);
                } catch (e) {
                    seleccionados = [];
                }
            }

            // Filtra los que NO estén ya seleccionados (por curp)
            const todos = data
                .filter(colaborador =>
                    !seleccionados.some(sel => sel.curp === colaborador.curp)
                )
                .map((colaborador, idx) => {
                    return {
                        ...colaborador,
                        id: colaborador.curp,
                    };
                });
            console.log(todos);
            setColaboradores(todos);
            setAnteColab(seleccionados);
        };
        fetchColaboradores();
    }, []);

    const columns = [
        { field: "curp", headerName: "CURP", flex: 1 },
        { field: "nombre", headerName: "Nombre(s)", flex: 1 },
        { field: "apellidos", headerName: "Apellido(s)", flex: 1 },
        { field: "carrera", headerName: "Carrera", flex: 1 },
    ];

    const handleAgregar = () => {
        const seleccionados = colaboradores.filter(col =>
            selectedIds.includes(String(col.id))
        );

        const todosSeleccionados = [
            ...anteColab,
            ...seleccionados.filter(nuevo => !anteColab.some(ant => ant.curp === nuevo.curp))
        ];

        console.log("Colaboradores seleccionados:", todosSeleccionados);
        localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(todosSeleccionados));
        navigate(-1);
    };

    const handleRegresar = () => {
        // localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(anteColab));
        navigate(-1);
    };

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Colaboradores</Typography>
                <TableViewer
                    columns={columns}
                    rows={colaboradores}
                    checkboxSelection={true}
                    onSelectionModelChange={(ids) => {
                        console.log("IDs seleccionados (padre):", ids);
                        setSelectedIds(ids.map(String)); // Garantiza que sean strings para coincidir con col.id
                    }}
                />

                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="outlined"
                            onClick={handleRegresar}
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

export default CrudColaboradores;