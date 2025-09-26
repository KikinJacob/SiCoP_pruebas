import React from "react";
import { useForm } from "react-hook-form";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { createEmpresa } from "../api/Empresa.api";

function EmpresaRegistro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await createEmpresa(data);
    console.log(res);
    /* navigate("/RegistroProyecto/6"); */
    /* navigate("/RegistroProyecto/6"); */
  });

  return (
    <div className="max-w-xl mx-auto">
      <nav>
        <NavBar />
      </nav>

      <h1 className="text-center">Registro de Empresa</h1>
      <p className="text-center">
        Captura los campos con la información correspondiente, valida la
        información antes de registrar
      </p>

      <form onSubmit={onSubmit}>
        {/*NOMBRE*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">Nombre</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              {...register("companyName", {
                required: true,
                pattern: /[a-zA-Z0-9\s\.\&\-]+/
              })}
            />
            {errors.companyName && (
              <p style={{ color: "#E11306" }}>Campo obligatorio</p>
            )}
          </div>
        </div>

        {/*RFC*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">RFC</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              minLength={13}
              maxLength={13}
              {...register("rfc", {
                required: true,
                pattern: /([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])/
              })}
            />
            {errors.rfc && (
              <p style={{ color: "#E11306" }}>Campo obligatorio</p>
            )}
          </div>
        </div>

        {/*RAZON SOCIAL*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">Razon social</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              {...register("businessName", {
                required: true,
                pattern: /[a-zA-Z0-9\s\.\&\-]+/
              })}
            />
            {errors.businessName && (
              <p style={{ color: "#E11306" }}>Campo obligatorio</p>
            )}
          </div>
        </div>

        {/*SECTOR*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">Sector</label>
          <div class="col-sm-10">
            <select
              class="form-select"
              aria-label="Default select example"
              {...register("sector", {
                required: true,
              })}
            >
              <option value="PB">Publico</option>
              <option value="PV">Privado</option>
            </select>
            {errors.sector && (
              <p style={{ color: "#E11306" }}>Campo obligatorio</p>
            )}
          </div>
        </div>

        {/*TIPO DE EMPRESA*/}
        <div class="p-3 row">
          <label class="col-sm-2 col-form-label">Tipo de empresa</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              {...register("companyType", {
                required: true,
                pattern: /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\&\-]+/
              })}
            />
            {errors.companyType && (
              <p style={{ color: "#E11306" }}>Campo obligatorio</p>
            )}
          </div>
        </div>

        {/*BOTONES*/}
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            class="btn btn-outline-success me-md-2"
            type="button"
            onClick={() => window.history.back()}
          >
            Regresar
          </button>
          <button class="btn btn-success" type="submit">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmpresaRegistro;
