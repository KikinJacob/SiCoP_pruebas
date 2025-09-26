import React from "react";
import { useNavigate } from "react-router-dom";

export default function Investigadores({Inv}) {
  const navigate = useNavigate ()

  return (
    <th scope="row">
            <input className="form-check-input" type="checkbox" value="" id={Inv.id}/>
            <td>{Inv.NoControl}</td>
            <td>{Inv.Nombre}</td>
            <td>{Inv.Apellido}</td>
            <td>{Inv.Semetre}</td>
            <td>{Inv.Carrera}</td>
    </th>
  );
}

