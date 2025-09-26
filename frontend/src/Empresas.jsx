import React, {useEffect, useState } from "react";
import { Box, Fab, Typography, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";
import { getAllEmpresas } from "./api/Empresa.api.js"
import { EmergencyRecording } from "@mui/icons-material";
import { SECTION_TYPE_GRANULARITY } from "@mui/x-date-pickers/internals/utils/getDefaultReferenceDate.js";
import { useRegistroProyecto } from "./components/Context.jsx";

function Empresas() {
    const navigate = useNavigate();
    const [empresas, setEmpresas] = useState([]);
    const { updateProyecto, proyecto } = useRegistroProyecto();

    console.log("Datos del proyecto: ", proyecto);
    
    useEffect(() => {
        try {
            const fetchEmpresas = async () => {
            let seleccionados = [];
            const seleccionadosRaw = localStorage.getItem("empresaSeleccionada");
            if(seleccionadosRaw){
                try {
                    seleccionados = JSON.parse(seleccionadosRaw);
                } catch (error) {
                    seleccionados = [];
                }
            }

            if (!Array.isArray(seleccionados)) seleccionados = [];

            const dataGrid = seleccionados.map((empresas) => ({
                ...empresas,
                id: empresas.rfc,
                rfc: empresas.rfc,
                razonSocial: empresas.razonSocial,
                sector: empresas.sector,
                tipo_Empresa: empresas.tipo_empresa
            }))
            setEmpresas(dataGrid);
            console.log(dataGrid);
        };
        fetchEmpresas();
        } catch (error) {
            console.error("Error al cargar las empresas: ", error);
        }
    }, []);

    // Se eliminó la columna de acciones
    const columns = [
        { field: "rfc", headerName: "RFC", flex: 1 },
        { field: "razonSocial", headerName: "Razón Social", flex: 1 },
        { field: "sector", headerName: "Sector", flex: 1 },
        { field: "tipo_Empresa", headerName: "Tipo de Empresa", flex: 1 },
    ];
    
    const handleAddEmpresa = () => {
        localStorage.setItem("empresaSeleccionada", JSON.stringify(empresas));
        navigate("/CrudEmpresas");
    }

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Empresas del Proyecto</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                    onClick={() => handleAddEmpresa()}
                >
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir Empresa
                </Fab>
                <TableViewer columns={columns} rows={empresas} />
                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Estudiantes")}
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
                                updateProyecto({empresas});
                                console.log({empresas});
                                navigate("/VinculacionFinanciamiento")
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

export default Empresas;