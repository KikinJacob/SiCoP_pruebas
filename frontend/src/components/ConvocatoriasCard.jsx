import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardHeader, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ConvocatoriasCard({ convocatoria }) {
  const navigate = useNavigate();
  const { convocatoria:nombre, 
          fechaInicioFinanciamiento,
          fechaFinanciamiento } = convocatoria;

  return (
    <Card onClick={() => navigate('../Administracion/ConvocatoriasDetalle')} 
      sx={{
        minHeight: { xs: 200, sm: 250, md: 300 },
        maxHeight: 'auto',
        width: { xs: 200, sm: 260, md: 350 },
        margin: "auto"
      }}
    >
      <CardActionArea>
        <CardHeader sx={{ backgroundColor: "#E9F1FE" }}></CardHeader>
        <CardContent sx={{ width: "100%", height: "60%" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "start" , overflow:'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {nombre}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "start" }}
          >
            {fechaInicioFinanciamiento}
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
            {fechaInicioFinanciamiento}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ConvocatoriasCard;
