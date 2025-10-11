import React, { useEffect } from "react";
import { Box, Fab, Typography, Button, Grid, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
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
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [colaboradorToDelete, setColaboradorToDelete] = React.useState(null);
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
        setColaboradorToDelete(row);
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (colaboradorToDelete) {
            const eliColaboradores = colaboradores.filter((cola) => cola.curp !== colaboradorToDelete.curp);
            setColaboradores(eliColaboradores);
            localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(eliColaboradores));
        }
        setOpenDeleteModal(false);
        setColaboradorToDelete(null);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setColaboradorToDelete(null);
    };

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
                <Typography variant="h3" style={{ marginBottom: "20px" }}>Colaboradores del Proyecto</Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={handleAgregar}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir Colaborador
                    </Fab>
                </div>
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

            {/* Modal de Confirmación para Eliminar */}
            <Dialog
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                maxWidth="xs"
                fullWidth
                sx={{ zIndex: 2100 }}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                        width: '350px',
                        maxHeight: '400px'
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
                            Eliminar Colaborador
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
                    <Typography variant="body1" sx={{ mt: 2, mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
                        ¿Está seguro de eliminar este colaborador?
                    </Typography>
                    <DialogContentText sx={{
                        fontSize: '0.85rem',
                        color: 'text.primary',
                        lineHeight: 1.3
                    }}>
                        {colaboradorToDelete && `${colaboradorToDelete.nombre} ${colaboradorToDelete.apellidos}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
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
                            minWidth: '110px',
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
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            minWidth: '110px',
                            '&:hover': {
                                backgroundColor: '#c62828',
                                transform: 'translateY(-1px)',
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

export default Colaboradores;