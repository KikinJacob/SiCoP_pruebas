import { useEffect, useState } from "react";
import { getAllConvocatorias } from "../api/Convocatoria.api";

function LiderOptions() {
  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    async function loadConvocatorias() {
      const ans = await getAllConvocatorias();
      setConvocatorias(ans.data);
    }
    loadConvocatorias();
  }, []);

  return (
    <>
      {convocatorias.map((convocatoria) => (
        <option key={convocatoria.clave_convocatoria} value={convocatoria.clave_convocatoria}>
          {convocatoria.convocatoria}
        </option>
      ))}
    </>
  );
}

export default LiderOptions;