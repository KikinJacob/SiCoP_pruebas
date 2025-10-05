import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardHeader, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConvocatoriasCard({ convocatoria, onClick }) {
  const navigate = useNavigate();

  // Proporcionar valores por defecto si no se pasa convocatoria
  const nombre = convocatoria?.convocatoria || "Convocatoria de Ejemplo";
  const fechaInicioFinanciamiento = convocatoria?.fechaInicioFinanciamiento || "2024-01-01";
  const fechaFinanciamiento = convocatoria?.fechaFinanciamiento || "2024-12-31";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('../Administracion/ConvocatoriasDetalle');
    }
  };

  return (
    <Card onClick={handleClick}
      sx={{
        minHeight: { xs: 200, sm: 250, md: 300 },
        maxHeight: 'auto',
        width: { xs: 200, sm: 260, md: 350 },
        margin: "auto"
      }}
    >
      <CardActionArea>
        <CardHeader style={{ backgroundColor: "#E9F1FE" }}></CardHeader>
        <CardContent style={{ width: "100%", height: "60%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "start" }}
          >
            {nombre}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "start" }}
          >
            Fecha inicio: {fechaInicioFinanciamiento}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              textAlign: "start",
              width: "100%",
              overflow: "hidden",
              whiteSpace: "pre",
              textOverflow: "ellipsis",
            }}
          >
            Fecha fin: {fechaFinanciamiento}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ConvocatoriasCard;
