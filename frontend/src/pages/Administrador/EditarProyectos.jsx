import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TableViewer from "../../components/TableViewer";
import { getLineasInv } from "../../api/LineaInv.api";
import { getAllInvestigadores } from "../../api/Investigadores.api";
import { getMetas } from "../../api/Metas.api";
import { getAllConvocatorias } from "../../api/Convocatoria.api";
import { updateProyecto } from "../../api/Proyectos.api";

function EditarProyectos() {
  // VARIABLES PARA EL FUNCIONAMIENTO DE LA PAGINA
  const navigate = useNavigate();
  // const { handleSubmit } = useForm();
  const location = useLocation();
  const { proyecto } = location.state;

  /// DATOS DEL BACKEND PARA SELECCIONAR
  const [lineasInvestigacion, setlineasInvestigacion] = useState([]);
  const [investigadores, setInvestigadores] = useState([]);
  const [metas, setMetas] = useState([]);
  const [convocatorias, setConvocatorias] = useState([]);

  /// DATOS TRAIDOS DE LA PAGINA PROYECTO PARA MODIFICAR
  const { control, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm({
    defaultValues: {
      nombre: "",
      resumen: "",
      objetivos: "",
      fechaInicio: "",
      fechaFin: "",
      financiamiento: false,
      quienFinancia: "",
      monto: "",
      fechaInicioFinanciamiento: "",
      fechaFinFinanciamiento: "",
    }
  });

  const [area, setArea] = useState("");
  const [linea, setLinea] = useState("");
  const [lider, setLider] = useState("");
  const [colaboradoresPro, setColaboradoresPro] = useState([]);
  const [empresa, setEmpresa] = useState("") || "";
  const [convocatoria, setConvocatoria] = useState("");
  const [selectedMetas, setSelectedMetas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  /// AREAS DE DESARROLLO 
  const AreasInv = [
    { id: 1, label: "Ciencias Básicas", value: "Ciencias Básicas" },
    { id: 2, label: "Ingeniería", value: "Ingeniería" },
    { id: 3, label: "Salud", value: "Salud" },
    { id: 4, label: "Educación", value: "Educación" },
    { id: 5, label: "Sociales", value: "Sociales" }
  ]

  useEffect(() => {
    const preloadProyecto = async () => {
      try {
        const [
          lineasInv,
          investigadores,
          metas,
          convo,
        ] = await Promise.all([
          getLineasInv(),
          getAllInvestigadores(),
          getMetas(),
          getAllConvocatorias(),
        ]);

        setMetas(metas);
        setConvocatorias(convo);
        setlineasInvestigacion(lineasInv);
        setInvestigadores(investigadores);

        const proyectoTemp = localStorage.getItem("proyectoEnEdicion");

        if(proyectoTemp){
          const proyectoTotal = JSON.parse(proyectoTemp);
          console.log(proyectoTotal);
          reset({
            nombre: proyectoTotal.nombreProyecto || "",
            resumen: proyectoTotal.resumen || "",
            objetivos: proyectoTotal.objetivos || "",
            fechaInicio: proyectoTotal.fechaInicio || "",
            fechaFin: proyectoTotal.fechaFin || "",
            financiamiento: proyectoTotal.financiamiento === "Si" ? true : false,
            quienFinancia: proyectoTotal.quienFinancia || "",
            monto: proyectoTotal.monto || "",
            fechaInicioFinanciamiento: proyectoTotal.fechaInicioFinanciamiento || "",
            fechaFinFinanciamiento: proyectoTotal.fechaFinFinanciamiento || "",
          });
        } else if (proyecto) {
          reset({
            nombre: proyecto.nombreProyecto || "",
            resumen: proyecto.resumen || "",
            objetivos: proyecto.objetivos || "",
            fechaInicio: proyecto.fechaInicio || "",
            fechaFin: proyecto.fechaFin || "",
            financiamiento: proyecto.financiamiento === "Si" ? true : false,
            quienFinancia: proyecto.quienFinancia || "",
            monto: proyecto.monto || "",
            fechaInicioFinanciamiento: proyecto.fechaInicioFinanciamiento || "",
            fechaFinFinanciamiento: proyecto.fechaFinFinanciamiento || "",
          })
        }

        if(proyectoTemp){
          const proyectoTotal = JSON.parse(proyectoTemp);
          console.log(proyectoTotal.selectedMetas);
          if(proyectoTotal?.selectedMetas){
            // console.lg(proyectoTotal.selectedMetas);
            setSelectedMetas(proyectoTotal.selectedMetas);
          } 
        } else if (proyecto?.metas) {
          const metasDelProyecto = proyecto.metas.map(metaPro => {
            const baseMeta = metas.find(m => m.idMeta === metaPro.id);
            return {
              ...baseMeta,
              cantidad: metaPro.cantidad
            };
          });
          setSelectedMetas(metasDelProyecto);
        }

        if (proyecto?.lineaInvestigacion_LineaPk) {
          const linea = lineasInv.find(l => l.nombre === proyecto.lineaInvestigacion_LineaPk);
          // console.log(linea);
          if (linea) setLinea(linea.idLineaInvestigacion);
        }

        if (proyecto?.liderProyecto) {
          const lider = investigadores.find(inv => inv.curp === proyecto.liderProyecto.curp);
          // console.log("Lider de proyecto: ", lider);
          if (lider) setLider(lider.curp);
        }

        if (proyecto?.convocatoria) {
          // console.log(convo);
          const convoca = convo.find(conv => conv.clave_convocatoria === proyecto.convocatoria.clave_convocatoria);
          // console.log("Convocatoria encontrada: ",convoca);
          if (convoca) setConvocatoria(convoca.clave_convocatoria);
        }

        if (proyecto?.areaDesarrolloTec) {
          const area = AreasInv.find(a => a.value === proyecto.areaDesarrolloTec);
          if (area) setArea(area.value);
        }

        if (proyecto?.colaboradores) {
          const dataWithId = proyecto.colaboradores.map((cola) => ({
            ...cola,
            id: cola.curp
          }));
          // console.log(dataWithId);
          setColaboradoresPro(dataWithId);
        }

        if (proyecto?.estudiante) {
          try {
            const dataWithId = proyecto.estudiante.map((cola) => ({
              ...cola,
              id: cola.noControl
            }));
            // console.log(dataWithId);
            setEstudiantes(dataWithId);
          } catch (error) {
            console.log("Error al poner a los estudiantes: ", error);
          }
        }

        if (proyecto?.rfc) {
          try {
            const dataWithId = {
              ...proyecto.rfc,
              id: proyecto.rfc.rfc
            };
            // console.log("Empresa data: ",dataWithId);
            setEmpresa([dataWithId]);
          } catch (error) {
            console.error("Error al cargar las empresas: ", error);
          }
        }

        const estudiantesLocalRaw = localStorage.getItem("estudiantesSeleccionados");
        const colaboradoresLocalRaw = localStorage.getItem("colaboradoresSeleccionados");
        const empresaLocalRaw = localStorage.getItem("empresaSeleccionada");

        if (estudiantesLocalRaw) {
          const EstudiantesTotal = JSON.parse(estudiantesLocalRaw);
          setEstudiantes(EstudiantesTotal);
        }

        if (colaboradoresLocalRaw) {
          const ColaboradoresTotal = JSON.parse(colaboradoresLocalRaw);
          setColaboradoresPro(ColaboradoresTotal);
        }
        if (empresaLocalRaw) {
          const EmpresaTotal = JSON.parse(empresaLocalRaw);
          setEmpresa(EmpresaTotal);
        }
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      }
    }

    preloadProyecto();

    // if (proyecto) {

    //   // setNombre(proyecto.nombreProyecto || "");
    //   // setArea(proyecto.areaDesarrolloTec || "");
    //   // setFechaInicio(proyecto.fechaInicio || "");
    //   // setFechaFin(proyecto.fechaFin || "");
    //   // setResumen(proyecto.resumen || "");
    //   // setObjetivos(proyecto.objetivos || "");
    //   // setLider(proyecto.lider || "");
    //   setSelectedMetas(proyecto.metas || "");
    //   setMetasSeleccionadas(proyecto.metas || []);
    //   // setConvocatoria(proyecto.convocatoria || "");
    //   // setFinanciamiento(proyecto.financiamiento || false);
    //   // setQuienFinancia(proyecto.quienFinancia || "");
    //   // setMonto(proyecto.monto || "");
    //   // setFechaInicioFinanciamiento(proyecto.fechaInicioFinanciamiento || "");
    //   // setFechaFinFinanciamiento(proyecto.fechaFinFinanciamiento || "");

    //   // setEmpresa(proyecto.rfc || "");
    //   // setColaboradoresPro(proyecto.colaboradores || "");
    //   // setEstudiantes(proyecto.estudiante || "");
    // }
  }, [proyecto]);

  // Manejo de metas seleccionadas y cantidades
  const handleAddMeta = (e) => {
    const metaId = e.target.value;
    if (
      metaId &&
      !selectedMetas.find((meta) => meta.idMeta === metaId)
    ) {
      const selectedMeta = metas.find((meta) => meta.idMeta === metaId);
      setSelectedMetas([
        ...selectedMetas,
        { ...selectedMeta, cantidad: 0 },
      ]);
    }
  };

  const handleRemoveMeta = (metaId) => {
    setSelectedMetas(selectedMetas.filter((meta) => meta.idMeta !== metaId));
  };

  const handleCantidadChange = (metaId, value) => {
    setSelectedMetas(
      selectedMetas.map((meta) =>
        meta.idMeta === metaId
          ? { ...meta, cantidad: value < 0 ? 0 : value }
          : meta
      )
    );
  };

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "", // 'agregar' | 'editar' | 'eliminar'
    entity: "", // 'colaborador' | 'estudiante' | 'empresa'
    row: null,
  });

  // Abrir modal de acción
  const openModal = (type, entity, row = null) => {
    setModal({ open: true, type, entity, row });
  };

  // Cerrar modal
  const closeModal = () => setModal({ open: false, type: "", entity: "", row: null });

  const confirmModal = () => {
    if (modal.type === "eliminar" && modal.row) {
      if (modal.entity === "colaborador") setColaboradoresPro(colaboradoresPro.filter(r => r.id !== modal.row.id));
      if (modal.entity === "estudiante") setEstudiantes(estudiantes.filter(r => r.id !== modal.row.id));
      if (modal.entity === "empresa") setEmpresa(empresa.filter(r => r.id !== modal.row.id));
      closeModal();
    } else {
      const values = getValues();
      const data = {...values, estudiantes, colaboradoresPro, area, linea, empresa, convocatoria, selectedMetas};
      // console.log("Datos completos que se guarda en el localstorage: ", data);
      localStorage.setItem("proyectoEnEdicion", JSON.stringify(data));
      if (modal.type === "editar" && modal.row) {
        // Redirige a los formularios de registro/edición según las rutas de App.jsx
        if (modal.entity === "colaborador") navigate("/Administracion/RegistroColaborador");
        if (modal.entity === "estudiante") navigate("/RegistroAlumnos", { state: { estudiante: modal.row } });
        if (modal.entity === "empresa") navigate("/RegistroEmpresa");
        closeModal();
      } else if (modal.type === "agregar") {
        // Redirige a los CRUD correspondientes
        if (modal.entity === "colaborador") handleAddColaborador();
        if (modal.entity === "estudiante") handleAddEstudiante();
        if (modal.entity === "empresa") handleAddEmpresa();
        closeModal();
      }
    }
  };
  // Columnas con acciones
  const columnsEstudiantes = [
    { field: "noControl", headerName: "No.Control", width: 120 },
    { field: "nombre", headerName: "Nombre(s)", width: 200 },
    { field: "apellidos", headerName: "Apellido(s)", width: 200 },
    { field: "carrera", headerName: "Carrera", width: 200 },
    { field: "semestre", headerName: "Semestre", width: 120 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => openModal("editar", "estudiante", params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => openModal("eliminar", "estudiante", params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const columnsEmpresas = [
    { field: "rfc", headerName: "RFC", width: 150 },
    { field: "razonSocial", headerName: "Razón Social", width: 250 },
    { field: "sector", headerName: "Sector", width: 150 },
    { field: "tipoEmpresa", headerName: "Tipo de Empresa", width: 180 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => openModal("editar", "empresa", params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => openModal("eliminar", "empresa", params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const columnsColaboradores = [
    { field: "curp", headerName: "CURP", width: 180 },
    { field: "nombre", headerName: "Nombre(s)", width: 180 },
    { field: "apellidos", headerName: "Apellido(s)", width: 180 },
    { field: "carrera", headerName: "Carrera", width: 180 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => openModal("eliminar", "colaborador", params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // Texto para el modal según la acción
  const getModalText = () => {
    if (modal.type === "agregar") {
      if (modal.entity === "colaborador") return "¿Desea agregar un nuevo colaborador?";
      if (modal.entity === "estudiante") return "¿Desea agregar un nuevo estudiante?";
      if (modal.entity === "empresa") return "¿Desea agregar una nueva empresa?";
    }
    if (modal.type === "editar" && modal.row) {
      return `¿Desea editar a ${modal.row.nombre || modal.row.razonSocial || modal.row.curp}?`;
    }
    if (modal.type === "eliminar" && modal.row) {
      return `¿Desea eliminar a ${modal.row.nombre || modal.row.razonSocial || modal.row.curp}?`;
    }
    return "";
  };

  // Metodos para agregar integrantes al proyecto
  const handleAddEstudiante = () => {
    localStorage.setItem("estudiantesSeleccionados", JSON.stringify(estudiantes));
    navigate("/CrudEstudiantes");
    // console.log(estudiantes);
  };

  const handleAddColaborador = () => {
    localStorage.setItem("colaboradoresSeleccionados", JSON.stringify(colaboradoresPro));
    navigate("/CrudColaboradores");
  };

  const handleAddEmpresa = () => {
    localStorage.setItem("empresaSeleccionada", JSON.stringify(empresa));
    navigate("/CrudEmpresas");
  }

  // Metodos para el manejo de la pagina
  const onSubmit = async (data) => {
    const estudiantesSeleccionados = estudiantes.map(e => e.id);
    const colaboradoresSeleccionados = colaboradoresPro.map(e => e.id);
    const metasPayload = selectedMetas.map((meta) => ({
      id: meta.idMeta,
      cantidad: meta.cantidad,
    }));

    const datosCompletos = { ...data, estudiantesSeleccionados, colaboradoresSeleccionados, lider, area, empresa, convocatoria, linea, metasPayload };
    // console.log(datosCompletos);

    // console.log(metasPayload);

    try {
      const response = await updateProyecto(proyecto.claveInterna, datosCompletos);
      // console.log("Respuesta desde el servidor: ", response);
    } catch (error) {
      console.error("Error al actualizar el proyecto: ", error);
    }
  }

  const handleRegresar = () => {
    localStorage.clear();
    navigate("/Proyectos");
  }

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", bgcolor: "#f5f5f5" }}>
      <Box
        className="p-5"
        sx={{
          marginTop: "5vh",
          marginLeft: { xs: 0, md: "2vw" },
          width: { xs: "100vw", md: "calc(100vw - 240px)" },
          minHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, width: "100%" }}>
          Editar Proyecto
        </Typography>
        <Paper sx={{ p: 3, width: "100%", maxWidth: 1100 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Formulario principal */}
              <Grid item xs={12}>
                <Controller
                  name="nombre"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Nombre del proyecto"
                      fullWidth
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                {/* <TextField
                  label="Nombre del proyecto"
                  value={formData.nombre}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                  fullWidth
                  required
                /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Área de Investigación</InputLabel>
                  <Select
                    label="Área de Investigación"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    {AreasInv.map((ae) => (
                      <MenuItem key={ae.id} value={ae.value}>
                        {ae.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Línea de investigación</InputLabel>
                  <Select
                    label="Línea de Investigación"
                    value={linea}
                    onChange={(e) => setLinea(e.target.value)}
                  >
                    {lineasInvestigacion.map((inv) => (
                      <MenuItem key={inv.idLineaInvestigacion} value={inv.idLineaInvestigacion}>
                        {inv.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="fechaInicio"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Fecha de Inicio"
                      type="date"
                      fullWidth
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                {/* <TextField
                  label="Fecha de inicio"
                  type="date"
                  fullWidth
                  onChange={(e) => setFormData((prev) => ({ ...prev, fechaInicio: e.target.value }))}
                  value={formData.fechaInicio}
                  InputLabelProps={{ shrink: true }}
                  required
                /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="fechaFin"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Fecha de finalizacion (estimada)"
                      type="date"
                      fullWidth
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                {/* <TextField
                  label="Fecha de finalización (estimada)"
                  type="date"
                  fullWidth
                  onChange={(e) => setFormData((prev) => ({ ...prev, fechaFin: e.target.value }))}
                  value={formData.fechaFin}
                  InputLabelProps={{ shrink: true }}
                  required
                /> */}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="resumen"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      rows={3}
                      multiline
                      label="Resumen"
                      fullWidth
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                {/* <TextField
                  label="Resumen"
                  multiline
                  rows={3}
                  onChange={(e) => setFormData((prev) => ({ ...prev, resumen: e.target.value }))}
                  value={formData.resumen}
                  fullWidth
                  required
                /> */}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="objetivos"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      multiline
                      rows={3}
                      label="Objetivos"
                      fullWidth
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                {/* <TextField
                  label="Objetivos"
                  multiline
                  rows={3}
                  onChange={(e) => setFormData((prev) => ({ ...prev, objetivos: e.target.value }))}
                  value={formData.objetivos}
                  fullWidth
                  required
                /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Líder de proyecto</InputLabel>
                  <Select label="Líder de proyecto"
                    value={lider}
                    onChange={(e) => setLider(e.target.value)}
                  >
                    {investigadores.map((inv) => (
                      <MenuItem key={inv.curp} value={inv.curp}>
                        {inv.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>

              </Grid>

              {/* Metas dinámicas */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Metas
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="metaSelect-label">Agregar meta</InputLabel>
                      <Select
                        labelId="metaSelect-label"
                        value=""
                        onChange={handleAddMeta}
                        label="Agregar meta"
                      >
                        <MenuItem value="" disabled>
                          Seleccione una meta
                        </MenuItem>
                        {metas
                          .filter((meta) => !selectedMetas.find((m) => m.idMeta === meta.idMeta))
                          .map((meta) => (
                            <MenuItem key={meta.idMeta} value={meta.idMeta}>
                              {meta.nombre}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Meta</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="center">Eliminar</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedMetas.map((meta) => (
                            <TableRow key={meta.idMeta}>
                              <TableCell>{meta.nombre}</TableCell>
                              <TableCell align="center" sx={{ width: 120 }}>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={meta.cantidad}
                                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                                  onChange={(e) =>
                                    handleCantidadChange(meta.idMeta, parseInt(e.target.value) || 0)
                                  }
                                  sx={{ width: 80 }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  color="error"
                                  onClick={() => handleRemoveMeta(meta.idMeta)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                          {selectedMetas.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3} align="center">
                                No hay metas agregadas.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Tablas CRUD con acciones */}
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Colaboradores</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => openModal("agregar", "colaborador")}
                      >
                        Agregar colaborador
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <TableViewer columns={columnsColaboradores} rows={colaboradoresPro} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Estudiantes</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => openModal("agregar", "estudiante")}
                      >
                        Agregar estudiante
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <TableViewer columns={columnsEstudiantes} rows={estudiantes} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ mb: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Empresas</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        size="small"
                        onClick={() => openModal("agregar", "empresa")}
                      >
                        Agregar empresa
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <TableViewer columns={columnsEmpresas} rows={empresa} />
                  </CardContent>
                </Card>
              </Grid>

              {/* Resto del formulario */}
              <Grid item xs={12} sm={6}>

              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Convocatoria</InputLabel>
                  <Select label="Convocatoria" value={convocatoria} onChange={(e) => setConvocatoria(e.target.value)}>
                    {convocatorias.map((conv) => (
                      <MenuItem key={conv.clave_convocatoria} value={conv.clave_convocatoria}>
                        {conv.convocatoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Financiamiento */}
              {/* Checkbox: ¿Tiene financiamiento? */}
              <Grid item xs={12}>
                <Controller
                  name="financiamiento"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="¿Tiene financiamiento?"
                    />
                  )}
                />
              </Grid>

              {watch("financiamiento") && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="quienFinancia"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="¿Quién financia?"
                          fullWidth
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="monto"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          label="Monto ($)"
                          type="number"
                          fullWidth
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="fechaInicioFinanciamiento"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Fecha de inicio de financiación"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="fechaFinFinanciamiento"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Fecha de fin de financiación"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}


              <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRegresar()}
                >
                  Regresar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Confirmar cambios
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      {/* Modal de confirmación */}
      <Dialog open={modal.open} onClose={closeModal}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          {getModalText()}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="inherit">Cancelar</Button>
          <Button onClick={confirmModal} color="primary" variant="contained">
            Sí, confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditarProyectos;