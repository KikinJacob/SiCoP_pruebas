import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Box,
  Typography,
  IconButton,
  CssBaseline,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRegistroProyecto } from "../../components/Context";
import { getMetas } from "../../api/Metas.api";

export default function Metas() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [selectedMetas, setSelectedMetas] = useState([]);
  const [metas, setMetas] = useState([]);
  const { updateProyecto } = useRegistroProyecto();


  const messages = {
    req: "Este campo es obligatorio (0 si no hay)",
  };

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        const data = await getMetas();
        const metas_data = data.map((meta) => ({
          ...meta,
          id: meta.idMeta,
          label: meta.nombre,
        }));
        console.log(metas_data);
        setMetas(metas_data);
      } catch (error) {
        console.error("Error al traer las metas: ", error);
      }
    };

    fetchMetas();
  }, []);

  const handleAddMeta = (e) => {
    const metaId = e.target.value;
    if (metaId && !selectedMetas.find(meta => meta.id === metaId)) {
      const selectedMeta = metas.find(meta => meta.id === metaId);
      if (selectedMeta) {
        setSelectedMetas([...selectedMetas, selectedMeta]);
      }
    }
  };


  const handleRemoveMeta = (metaId) => {
    setSelectedMetas(selectedMetas.filter(meta => meta.id !== metaId));
  };

  const onSubmit = (formValues) => {
    const metasPayload = selectedMetas.map((meta) => ({
      id: meta.id,
      cantidad: Number(formValues[String(meta.id)]) || 0,
    }));

    console.log("Metas a enviar:", metasPayload);

    updateProyecto({ metas: metasPayload });
    navigate("/Colaboradores");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mt: 8,
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <Typography variant="h3" align="center" style={{ marginBottom: "15px" }}>
          Metas del Proyecto
        </Typography>
        <Typography
          variant="h6"
          align="center"
          style={{ marginBottom: "35px", maxWidth: "none", whiteSpace: "nowrap" }}
        >
          Selecciona las metas que tu proyecto pretende alcanzar y especifica la cantidad esperada para cada una.
        </Typography>
        <Box
          component="main"
          sx={{
            p: 3,
            maxWidth: 1100,
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            minHeight: "auto",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="metaSelect-label">Metas</InputLabel>
              <Select
                labelId="metaSelect-label"
                id="metaSelect"
                defaultValue=""
                onChange={(e) => {
                  handleAddMeta(e);
                }}
                label="Metas"
              >
                <MenuItem value="" disabled>
                  Seleccione una meta
                </MenuItem>
                {metas.map((meta) => (
                  <MenuItem key={meta.id} value={meta.id}>
                    {meta.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedMetas.map((meta) => (
              <Paper key={meta.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>{meta.label}</Typography>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemoveMeta(meta.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <TextField
                  type="number"
                  defaultValue={0}
                  InputProps={{ inputProps: { min: 0 } }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register(String(meta.id), { required: true })}
                  error={!!errors[meta.id]}
                  helperText={errors[meta.id] ? messages.req : ""}
                />
              </Paper>
            ))}
            <Grid container spacing={2} className="p-3" sx={{ mt: 2, mb: 0 }}>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/RegistroProyecto2")}
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
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#1B396A",
                    color: "#fff",
                    borderRadius: "20px",
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
          </form>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}