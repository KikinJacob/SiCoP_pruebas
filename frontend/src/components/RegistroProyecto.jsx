import { Route, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

export default function RegistroProyecto({ title="Registro Proyecto", description=""}) {
  const navigate = useNavigate();
  return (
      <div className="max-w-xl mx-auto text-center">
        <h1>{title}</h1>
        <p>{description}</p>       
      </div>
  );
}


