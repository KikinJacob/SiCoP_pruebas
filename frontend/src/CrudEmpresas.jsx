import React, { useEffect, useState } from "react";
import { Box, Fab, Typography, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";
import { getAllEmpresas } from "./api/Empresa.api";

function CrudEmpresas() {
    const navigate = useNavigate();
    const [empresas, setEmpresas] = useState([]);
    const [selectedId, setSelectedId] = useState();

    useEffect(() => {
        const fetchEmpresas = async () => {
            const data = await getAllEmpresas();
            let seleccionada = [];
            const seleccionadaEmpresa = localStorage.getItem("empresaSeleccionada");
            if (seleccionadaEmpresa) {
                try {
                    seleccionada = JSON.parse(seleccionadaEmpresa);
                } catch (error) {
                    seleccionada = [];
                }
            }
            const todos = data
                .filter(empresa =>
                    !seleccionada.some(sel => sel.rfc === empresa.rfc)
                )
                .map((empresa) => {
                    return {
                        ...empresa,
                        id: empresa.rfc,
                        rfc: empresa.rfc,
                        razonSocial: empresa.razonSocial,
                        sector: empresa.sector,
                        tipoEmpresa: empresa.tipo_empresa,
                    };
                });
            console.log(todos);
            setEmpresas(todos);
        }
        fetchEmpresas();
    }, []);

    const handleAgregar = () => {
        const seleccionadoNuevo = empresas.filter(col => selectedId.includes(col.id));
        console.log(seleccionadoNuevo);

        localStorage.setItem("empresaSeleccionada", JSON.stringify(seleccionadoNuevo));
        navigate(-1);
    };

    // Se eliminó la columna de acciones
    const columns = [
        { field: "rfc", headerName: "RFC", flex: 1 },
        { field: "razonSocial", headerName: "Razón Social", flex: 1 },
        { field: "sector", headerName: "Sector", flex: 1 },
        { field: "tipoEmpresa", headerName: "Tipo de Empresa", flex: 1 },
    ];

    return (
        <Box>
            <div className="p-5" style={{ marginTop: "5vh", marginLeft: "2vw" }}>
                <Typography variant="h3">Empresas</Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{ right: "-82vw", marginBottom: "10px" }}
                >
                    <Link to={"/RegistroEmpresa"} className="text-white link-underline-primary">
                        <AddIcon sx={{ mr: 1 }} />
                        Registrar Empresa
                    </Link>
                </Fab>
                <TableViewer
                    columns={columns}
                    rows={empresas}
                    selectedIds={selectedId ? [selectedId] : []}
                    onSelectionModelChange={(ids) => {
                        console.log(ids[0]);
                        setSelectedId(ids[0]);
                    }}
                />
                <Grid container spacing={2} className="p-3" sx={{ mt: 2 }}>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
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
                            onClick={handleAgregar}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#162e54")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#1B396A")
                            }
                        >
                            Agregar
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default CrudEmpresas;