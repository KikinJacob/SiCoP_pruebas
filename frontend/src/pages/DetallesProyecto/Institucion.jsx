import { Component } from "react";
import DetallesProyecto from "../../components/NavBarDetalles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SideBar_Detalles from "../../components/SideBar_Detalles";

export default function Institucion() {
  var isEditable=true;
  const {register, formState: {errors}, handleSubmit}=useForm();
  const navigate = useNavigate();
  const onSubmit = (data)=>{
    console.log(data);
    navigate('/RegistroProyecto/6')
  }

  return (
    <div className="max-w-xl mx-auto" style={{padding: 90}}>
      <nav>
        <SideBar_Detalles />
      </nav>

      <h1 className="text-center">Empresa</h1>
      

      <form onSubmit={handleSubmit(onSubmit)}>

        {/*NOMBRE*/}
        <div class="p-3 row">
          <label  class="col-sm-2 col-form-label">
            Nombre
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control" disabled={isEditable} {...register('nombre',{
              required:true
            })} />
            {errors.nombre?.type === 'required' &&
              <p style={{color: '#E11306'}}>
                Campo obligatorio
              </p>}
          </div>
        </div>

        {/*RFC*/}
        <div class="p-3 row">
          <label  class="col-sm-2 col-form-label">
            RFC
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control"  minLength={13} maxLength={13} disabled={isEditable} {...register('rfc',{
              required:true
            })} />
            {errors.rfc?.type === 'required' &&
            <p style={{color: '#E11306'}}>
              Campo obligatorio
            </p>}
          </div>
        </div>

        {/*RAZON SOCIAL*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">
            Razon social
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control" disabled={isEditable} {...register('razon_Social',{
              required:true
            })}/>
            {errors.razon_Social?.type === 'required' &&
            <p style={{color: '#E11306'}}>
              Campo obligatorio
            </p>}
          </div>
        </div>
        
        {/*SECTOR*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">
            Sector
          </label>
          <div class="col-sm-10">
            <select class="form-select" disabled={isEditable} {...register('sector',{
              required:true
            })}>
              <option value="1">Publico</option>
              <option value="2">Privado</option>
            </select>
            {errors.sector?.type === 'required' && 
            <p style={{color: '#E11306'}}>
              Campo obligatorio
            </p>}
          </div>
        </div>
        
        {/*TIPO DE EMPRESA*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">
            Tipo de empresa
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control"  disabled={isEditable} {...register('tipo_Empresa',{
              required:true
            })}/>
            {errors.tipo_Empresa?.type === 'required' &&
            <p style={{color: '#E11306'}}>
              Campo obligatorio
            </p>}
          </div>
        </div>
        
        {/*BOTONES*/}
        <div class="row text-center">
          <div class="col align-items-end">
            <button
              class="btn btn-outline-success "
              type="button"
              onClick={() => {
                isEditable=false
                }}
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
      </form>
    </div>
  );
}
