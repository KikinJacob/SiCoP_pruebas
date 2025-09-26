import React from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Card, Button } from 'react-bootstrap';
import Footer from "../../components/Footer";
import { Typography, CssBaseline } from "@mui/material";

export default function ConvocatoriasDetalle() {
    const navigate = useNavigate();
    return (
        <div className="max-w-xl mx-auto text-center">
            <CssBaseline />
            <NavBar />
            <div className="text-center" style={{ paddingTop: '50px' }}>
                <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
                    Detalle de convocatoria
                </Typography>
                <div className="container">
                    <Card style={{ border: 'none' }}>
                        <Typography
                            variant="body1"
                            align="center"
                            style={{ marginTop: "20px" }}
                        >
                            <Card.Body>
                                <div style={{ textAlign: 'left' }}>
                                    <p><strong>Líder del proyecto:</strong> Juan Pérez</p>
                                    <p><strong>Desarrollado para:</strong> Empresas patito</p>
                                    <p><strong>Descripción:</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <p><strong>Link:</strong> ...</p>
                                </div>
                                <div className="text-center">
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
                                        Registrar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Typography>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}