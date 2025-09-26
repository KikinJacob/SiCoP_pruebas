import React from "react";
import { useNavigate } from "react-router-dom";

export default function Investigadores({Inv},multiselect=true) {
  const navigate = useNavigate ()
  
  if (multiselect){
    return (
      <tr>
        <th scope="row"><input class="form-check-input" type="checkbox" value="" key={Inv.id}/></th>
        <td>{Inv.CURP}</td>
        <td>{Inv.Nombre}</td>
        <td>{Inv.Apellido}</td>
        <td>{Inv.Carrera}</td>
      </tr>
    );
 }else{
    return (
      <tr>
        <th scope="row"><input class="form-check-input" type="radio" key={Inv.id}/></th>
        <td>{Inv.CURP}</td>
        <td>{Inv.Nombre}</td>
        <td>{Inv.Apellido}</td>
        <td>{Inv.Carrera}</td>
      </tr>
    );
 }

}

