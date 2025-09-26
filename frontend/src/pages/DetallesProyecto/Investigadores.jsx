import DetallesProyecto from "../../components/NavBarDetalles";
import {useEffect, useState} from 'react';
import {getAllInvestigadores} from '../../api/Investigadores.api';
import SideBar_Detalles from "../../components/SideBar_Detalles";

export default function Investigadores() {

  const [inv, setInv] = useState([])

  useEffect(() => {
    async function loadInv(){
      const res = await getAllInvestigadores();
      setInv(res.data)
    }
    loadInv();
  }, []);

  return (
    <div className="max-w-xl mx-auto" style={{padding:90}}>
      <nav>
        <SideBar_Detalles/>
      </nav>
      <div className="text-center">
        <h1>Investigadores participantes</h1>
        <div className="container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">CURP</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Carrera</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((inv, i) => (
                <tr key={i}>
                  <td>{inv.curp}</td>
                  <td>{inv.name}</td>
                  <td>{inv.last_name}</td>
                  <td>{inv.career}</td>
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
