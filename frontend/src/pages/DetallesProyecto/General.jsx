import DetallesProyecto from "../../components/NavBarDetalles";
import SideBar_Detalles from "../../components/SideBar_Detalles";

export default function General() {
  return (
    <div className="max-w-xl mx-auto" style={{paddingTop:90}}>
      <nav>
        <SideBar_Detalles/>
      </nav>
      <div className="text-center">
        <h1>Datos generales del proyecto</h1>
        

        <div class="row align-items-end">
          
          <div class="col">
            <button className="btn btn-success me-md-2">Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
