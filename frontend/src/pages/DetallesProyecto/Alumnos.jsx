import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SideBar_Detalles from '../../components/SideBar_Detalles';



export default function Alumnos() {
  const [alumno, setAlumno] = React.useState([]);

  
  React.useEffect(() => {
    async function loadAlumnos() {
      const res = await getAllAlumnos();
      setAlumno(res.data);
    }
    loadAlumnos();
  }, []);


  return (
    <div className="max-w-xl mx-auto">
      <nav>
        <SideBar_Detalles/>
      </nav>
      <div className="text-center" style={{paddingTop: 80}}>
        <h1>Alumnos participantes</h1>
        <div className="container">
          
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No. Control</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Semestre</th>
                <th scope="col">Carrera</th>
              </tr>
            </thead>
            <tbody>
              {alumno.map((alumno, i) => (
                <tr key={i}>
                  <td>{alumno.controlN}</td>
                  <td>{alumno.name}</td>
                  <td>{alumno.last_name}</td>
                  <td>{alumno.semester}</td>
                  <td>{alumno.career}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="row text-center">
          <div class="col align-items-end">
            <button
              class="btn btn-outline-success "
              type="button"
              onClick={() => window.history.back()}
            >
              Editar
            </button>
          </div>
          <div class="col">
            <button className="btn btn-success me-md-2" type="submit">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
