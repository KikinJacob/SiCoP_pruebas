import { Typography } from '@mui/material'
import React from 'react'

function NotFound() {
  return (
    <div style={{textAlign:'center',  
        }}>
        <img src="src\assets\progress.gif" class="rounded mx-auto d-block" alt="..." />
        <Typography variant='h1' style={{zIndex:3}}>Lo sentimos.</Typography>
        <Typography variant='h5'>Aun trabajamos en esta seccion.</Typography>
    </div>
  )
}

export default NotFound