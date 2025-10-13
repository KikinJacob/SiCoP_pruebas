import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableViewer from "../components/TableViewer";
import { getAllInvestigadores } from "../api/Investigadores.api";
import { getCarreras } from "../api/carrera.api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";

function CrudColaboradores() {
    const navigate = useNavigate();
    const [colaboradores, setColaboradores] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [anteColab, setAnteColab] = useState([]);
    // Estados para modal de confirmación
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [colaboradoresAgregar, setColaboradoresAgregar] = useState([]);

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
        const seleccionadosNuevos = colaboradores.filter(col =>
            selectedIds.includes(String(col.id))
        );

        if (seleccionadosNuevos.length === 0) {
            alert("Por favor selecciona al menos un colaborador");
            return;
        }

        // Filtra para no repetir por curp
        const nuevosUnicos = seleccionadosNuevos.filter(nuevo =>
            !anteColab.some(ant => ant.curp === nuevo.curp)
        );

        setColaboradoresAgregar(nuevosUnicos);
        setOpenConfirmModal(true);
    };

    const handleConfirmAgregar = () => {
        let existentes = [];
        const prev = localStorage.getItem("colaboradoresSeleccionados");
        if (prev) {
            try {
                existentes = JSON.parse(prev);
            } catch (e) {
                existentes = [];
            }
        }

        const todos = [...existentes, ...colaboradoresAgregar];
        localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(todos));
        setOpenConfirmModal(false);
        navigate(-1);
    };

    const handleCloseConfirmModal = () => {
        setOpenConfirmModal(false);
        setColaboradoresAgregar([]);
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

            {/* Modal de Confirmación (mismo diseño que CrudEstudiantes) */}
            <Dialog
                open={openConfirmModal}
                onClose={handleCloseConfirmModal}
                maxWidth="xs"
                fullWidth
                sx={{ zIndex: 2100 }}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                        width: '350px',
                        maxHeight: '500px'
                    }
                }}
            >
                <DialogTitle sx={{
                    textAlign: 'center',
                    p: 2,
                    backgroundColor: '#1B396A',
                    color: 'white',
                    fontWeight: 'bold',
                    position: 'relative'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Avatar sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            width: 45,
                            height: 45
                        }}>
                            <CheckCircleIcon fontSize="medium" />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                            Confirmar Agregación
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{
                    pt: '60px',
                    pb: 2,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    px: 3
                }}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2, color: '#1B396A', fontWeight: 'bold' }}>
                        ¿Está seguro de agregar {colaboradoresAgregar.length} colaborador{colaboradoresAgregar.length > 1 ? 'es' : ''} al proyecto?
                    </Typography>

                    {colaboradoresAgregar.length > 0 && (
                        <Box sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                            border: '1px solid #e0e0e0',
                            maxHeight: '150px',
                            overflowY: 'auto'
                        }}>
                            {colaboradoresAgregar.map((col, index) => (
                                <Box key={col.curp} sx={{ mb: index < colaboradoresAgregar.length - 1 ? 1 : 0 }}>
                                    <Typography variant="body2" sx={{
                                        color: '#1B396A',
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem'
                                    }}>
                                        {col.nombre} {col.apellidos}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.85rem'
                                    }}>
                                        {col.curp} - {col.carrera}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}

                    <DialogContentText sx={{
                        fontSize: '0.85rem',
                        color: 'text.primary',
                        lineHeight: 1.3
                    }}>
                        Los colaboradores seleccionados se agregarán al proyecto.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    justifyContent: 'center',
                    gap: 2,
                    backgroundColor: 'white'
                }}>
                    <Button
                        onClick={handleCloseConfirmModal}
                        variant="outlined"
                        size="medium"
                        sx={{
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            borderColor: '#1B396A',
                            color: '#1B396A',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: 'rgba(27, 57, 106, 0.05)',
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmAgregar}
                        variant="contained"
                        autoFocus
                        size="medium"
                        startIcon={<SaveIcon fontSize="small" />}
                        sx={{
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            backgroundColor: '#1B396A',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: '#153056',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(27, 57, 106, 0.3)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CrudColaboradores;