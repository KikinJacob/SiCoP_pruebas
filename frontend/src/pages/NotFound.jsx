import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ffffffff',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', color: '#1B396A' }}>
        Lo sentimos.
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: '20px', color: '#555' }}>
        Esta sección aún está en desarrollo.
      </Typography>
      <Link to="/Proyectos" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: '10px 20px',
            fontSize: '1rem',
            textTransform: 'none',
            backgroundColor: '#1B396A',
            '&:hover': {
              backgroundColor: '#16325C',
            },
          }}
        >
          Volver al inicio
        </Button>
      </Link>
    </Box>
  );
}

export default NotFound;