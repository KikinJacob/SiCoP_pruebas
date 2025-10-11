import React, { useEffect, useState } from "react";
import {
    Box,
    Fab,
    Typography,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Avatar
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "../components/TableViewer";
import { getEstudiantes } from "../api/Estudiante.api";
import { getCarreras } from "../api/carrera.api";

function CrudEstudiantes() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [estudiantesAgregar, setEstudiantesAgregar] = useState([]);

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

        if (seleccionadosNuevos.length === 0) {
            alert("Por favor selecciona al menos un estudiante");
            return;
        }

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

        setEstudiantesAgregar(nuevosUnicos);
        setOpenConfirmModal(true);
    };

    const handleConfirmAgregar = () => {
        let existentes = [];
        const prev = localStorage.getItem("estudiantesSeleccionados");
        if (prev) {
            try {
                existentes = JSON.parse(prev);
            } catch (e) {
                existentes = [];
            }
        }

        const todos = [...existentes, ...estudiantesAgregar];
        localStorage.setItem("estudiantesSeleccionados", JSON.stringify(todos));
        setOpenConfirmModal(false);
        navigate(-1);
    };

    const handleCloseConfirmModal = () => {
        setOpenConfirmModal(false);
        setEstudiantesAgregar([]);
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
                <Typography variant="h3" style={{ marginBottom: "20px" }}>Estudiantes</Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Fab
                        variant="extended"
                        color="primary"
                    >
                        <Link to={"/RegistroAlumnos"} className="text-white link-underline-primary">
                            <AddIcon sx={{ mr: 1 }} />
                            Registrar Estudiante
                        </Link>
                    </Fab>
                </div>
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

            {/* Modal de Confirmación */}
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
                        ¿Está seguro de agregar {estudiantesAgregar.length} estudiante{estudiantesAgregar.length > 1 ? 's' : ''} al proyecto?
                    </Typography>

                    {estudiantesAgregar.length > 0 && (
                        <Box sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                            border: '1px solid #e0e0e0',
                            maxHeight: '150px',
                            overflowY: 'auto'
                        }}>
                            {estudiantesAgregar.map((estudiante, index) => (
                                <Box key={estudiante.noControl} sx={{ mb: index < estudiantesAgregar.length - 1 ? 1 : 0 }}>
                                    <Typography variant="body2" sx={{
                                        color: '#1B396A',
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem'
                                    }}>
                                        {estudiante.nombre} {estudiante.apellidos}
                                    </Typography>
                                    <Typography variant="body2" sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.85rem'
                                    }}>
                                        {estudiante.noControl} - {estudiante.carrera}
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
                        Los estudiantes seleccionados se agregarán al proyecto.
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

export default CrudEstudiantes;