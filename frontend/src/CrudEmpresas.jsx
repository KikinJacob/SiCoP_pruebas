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
    Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Link, useNavigate } from "react-router-dom";
import TableViewer from "./components/TableViewer";
import { getAllEmpresas } from "./api/Empresa.api";

function CrudEmpresas() {
    const navigate = useNavigate();
    const [empresas, setEmpresas] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);

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
        if (!selectedId) {
            return;
        }

        const empresaSeleccionada = empresas.find(empresa => empresa.id === selectedId);
        setSelectedEmpresa(empresaSeleccionada);
        setOpenConfirmModal(true);
    };

    const handleConfirmAgregar = () => {
        const seleccionadoNuevo = empresas.filter(col => selectedId === col.id);
        console.log(seleccionadoNuevo);

        localStorage.setItem("empresaSeleccionada", JSON.stringify(seleccionadoNuevo));
        setOpenConfirmModal(false);
        setOpenSuccessModal(true);
    };

    const handleCloseConfirmModal = () => {
        setOpenConfirmModal(false);
        setSelectedEmpresa(null);
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
        navigate(-1);
    };

    const handleRegresar = () => {
        setOpenCancelModal(true);
    };

    const handleConfirmCancel = () => {
        setOpenCancelModal(false);
        navigate(-1);
    };

    const handleCloseCancelModal = () => {
        setOpenCancelModal(false);
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
                <Typography variant="h3" style={{ marginBottom: "20px" }}>Empresas</Typography>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <Fab
                        variant="extended"
                        color="primary"
                    >
                        <Link to={"/RegistroEmpresa"} className="text-white link-underline-primary">
                            <AddIcon sx={{ mr: 1 }} />
                            Registrar Empresa
                        </Link>
                    </Fab>
                </div>
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
                            onClick={handleRegresar}
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
                        width: '500px',
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
                        ¿Está seguro de agregar la siguiente empresa?
                    </Typography>
                    {selectedEmpresa && (
                        <Box sx={{ mt: 2, mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1B396A' }}>
                                Nombre: {selectedEmpresa.nombreEmpresa}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1B396A', mt: 1 }}>
                                RFC: {selectedEmpresa.rfc}
                            </Typography>
                        </Box>
                    )}
                    <DialogContentText sx={{
                        fontSize: '0.85rem',
                        color: 'text.primary',
                        lineHeight: 1.3
                    }}>
                        Esta acción agregará la empresa al proyecto.
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

            {/* Modal de Éxito */}
            <Dialog
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
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
                            <CheckCircleIcon fontSize="medium" />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" fontSize="1rem">
                            ¡Empresa Agregada!
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
                        La empresa ha sido agregada correctamente al proyecto.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}>
                    <Button
                        onClick={handleCloseSuccessModal}
                        variant="contained"
                        autoFocus
                        size="medium"
                        sx={{
                            borderRadius: 2,
                            px: 3,
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
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Cancelación */}
            <Dialog
                open={openCancelModal}
                onClose={handleCloseCancelModal}
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
                            Cancelar Selección
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
                        ¿Desea salir sin seleccionar empresa?
                    </Typography>
                    <DialogContentText sx={{
                        fontSize: '0.85rem',
                        color: 'text.primary',
                        lineHeight: 1.3
                    }}>
                        La selección actual se perderá si no se guarda.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    p: 2.5,
                    justifyContent: 'center',
                    gap: 2,
                    backgroundColor: 'white'
                }}>
                    <Button
                        onClick={handleCloseCancelModal}
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
                        Continuar
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        variant="contained"
                        autoFocus
                        size="medium"
                        startIcon={<CloseIcon fontSize="small" />}
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
                        Salir
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default CrudEmpresas;