import React, { useEffect, useState } from "react";
import {
    Box,
    Fab,
    Typography,
    Button,
    Grid,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Avatar
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";
import { useRegistroProyecto } from "./components/Context";

function Estudiantes() {
    const navigate = useNavigate();
    const [estudiante, setEstudiantes] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [estudianteToDelete, setEstudianteToDelete] = useState(null);
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
        setEstudianteToDelete(row);
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (estudianteToDelete) {
            const eliEstu = estudiante.filter(est => est.noControl !== estudianteToDelete.noControl);
            setEstudiantes(eliEstu);
            localStorage.setItem("estudiantesSeleccionados", JSON.stringify(eliEstu));
        }
        setOpenDeleteModal(false);
        setEstudianteToDelete(null);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setEstudianteToDelete(null);
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
                <Typography variant="h3" style={{ marginBottom: "20px" }}>Estudiantes del Proyecto</Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={handleAgregar}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir Estudiante
                    </Fab>
                </div>
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

            {/* Modal de Confirmación de Eliminación */}
            <Dialog
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                maxWidth="sm"
                fullWidth
                sx={{ zIndex: 2100 }}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        overflow: 'visible',
                        width: '450px',
                        minHeight: 'auto'
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
                            <WarningIcon fontSize="medium" />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                            Confirmar Eliminación
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{
                    pt: 3,
                    pb: 2,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    px: 3
                }}>
                    <Typography variant="body1" sx={{ mt: 1, mb: 2, color: '#1B396A', fontWeight: 'bold' }}>
                        ¿Está seguro de eliminar al estudiante?
                    </Typography>
                    {estudianteToDelete && (
                        <Box sx={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                            border: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="h6" sx={{
                                color: '#1B396A',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                mb: 1
                            }}>
                                {estudianteToDelete.nombre} {estudianteToDelete.apellidos}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                fontSize: '0.9rem',
                                mb: 0.5
                            }}>
                                No. Control: {estudianteToDelete.noControl}
                            </Typography>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                fontSize: '0.9rem'
                            }}>
                                Carrera: {estudianteToDelete.carrera}
                            </Typography>
                        </Box>
                    )}
                    <DialogContentText sx={{
                        fontSize: '0.85rem',
                        color: 'text.primary',
                        lineHeight: 1.2,
                        mb: 1
                    }}>
                        Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    p: 2,
                    justifyContent: 'center',
                    gap: 2,
                    backgroundColor: 'white'
                }}>
                    <Button
                        onClick={handleCloseDeleteModal}
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
                        onClick={handleConfirmDelete}
                        variant="contained"
                        autoFocus
                        size="medium"
                        startIcon={<DeleteIcon fontSize="small" />}
                        sx={{
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            backgroundColor: '#d32f2f',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            '&:hover': {
                                backgroundColor: '#c62828',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Estudiantes;