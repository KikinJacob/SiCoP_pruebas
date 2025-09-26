import React from "react";
import { Grid, CssBaseline, Typography } from "@mui/material";
import ConvocatoriasCard from "../components/ConvocatoriasCard";
import SideBar from "../components/SideBar";

export default function ConvocatoriasInvestigador({ user = { type: "Investigador" } }) {
  return (
    <div className="max-w-xl mx-auto text-center">
      <CssBaseline />
      {user && user.type === "Investigador" && (
        <nav>
          <SideBar />
        </nav>
      )}
      <div
        className="text-center"
        style={
          user && user.type === "Investigador"
            ? { paddingTop: "50px", marginLeft: "80px" }
            : { paddingTop: "50px" }
        }
      >
        <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
          Convocatorias
        </Typography>
        <p>
          Conoce las diversas convocatorias activas, en las que puedes
          participar para superarte a ti mismo, ayudando a transformar e innovar
          nuestra comunidad
        </p>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ padding: 30 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid xs={2} sm={4} md={4} className="p-2" key={index}>
              <ConvocatoriasCard />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}