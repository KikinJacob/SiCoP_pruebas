import React, { useCallback, useState, use } from "react";
import SideBar from "../../components/SideBar"; // Cambia el import al nuevo sidebar
import { useDropzone } from "react-dropzone";
import { Button, Link, Snackbar, Alert, Paper } from "@mui/material";
import { app } from "../../fb";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function Basic(props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openVw, setOpenVw] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState(null);
  const handleOpen = () => setOpenVw(true);
  const handleCloseVw = () => setOpenVw(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
      }
    }
  });

  const files = acceptedFiles.filter((file) => file.type === "application/pdf");

  const handleUpload = async (props) => {
    const file = files[0];
    setLoading(true);
    try {
      const storageRef = app.storage().ref();
      const archivoPath = storageRef.child(file.name);
      await archivoPath.put(file);
      const downloadURL = await archivoPath.getDownloadURL();
      console.log("Enlace de descarga:", downloadURL);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("archivo cargado: ", file.name);
      setLoading(false);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div>
      {pdfUrl===null && (<div className="card">
        <div className="card-body">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p style={{ color: "gray", fontStyle: "italic" }}>
              Arrastra un archivo o presiona para seleccionar
            </p>
          </div>
        </div>
      </div>)}

      {files.length > 0 ? (
        <aside className="row align-middle">
          <h5 className="pt-2">Archivo seleccionado</h5>
          {
            pdfUrl && (
             <div className="container">
               <iframe src={pdfUrl} style={{width:'50%', marginLeft: "20%", marginBottom: '2%'}} title="PDF Viewer"></iframe>
               <Button variant="text" color="error" style={{textAlign:"left", position:"relative", bottom:'80%', left:0, zIndex:5}}>X</Button>
             </div>
            )
          }

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleUpload}
          >
            {
            loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                Subir archivo <i className="bi-send"></i>
              </div>
            )}
          </button>
        </aside>
      ) : (
        <aside>
          <p className="fs-6 text-danger">* Sube el documento en formato pdf</p>
        </aside>
      )}

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ¡Documento guardado con exito!
        </Alert>
      </Snackbar>

      <Modal
        open={openVw}
        onClose={handleCloseVw}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            bgcolor: "transparent",
            boxShadow: 24,
            p: 5,
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "red",
              paddingTop: "3px",
              position: "fixed",
              fontSize: "25px",
              right: -1,
              top: 10,
              borderRadius: "50%",
              boxSizing: "25px",
            }}
          >
            X
          </Button>
          <iframe
            style={{ marginTop: "10px" }}
            src="https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf"
            width="100%"
            height="600px"
            loading="lazy"
            title="PDF-file"
          ></iframe>
        </Box>
      </Modal>
    </div>
  );
}

export default function Archivos() {
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const [daySelected, SetDaySelected] = useState(dayjs());

  return (
    <div
      className="container max-w-xl mx-auto"
      style={{ paddingTop: 80, paddingLeft: 30 }}
    >
      <nav>
        <SideBar /> {/* Usa el nuevo sidebar aquí */}
      </nav>
      <div className="row text-center">
        <h1>Captura de archivos</h1>

        <div className="container col">
          <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
            <div className="col-sm-6 mb-3 mb-sm-0 p-2">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Registro</h2>
                  <a
                    className="btn p-0 m-0 text-body-secondary"
                    onClick={() => console.log("formato")}
                  >
                    Descargar formato <i className="bi bi-download"></i>
                  </a>
                  <h6>
                    Fecha limite:{" "}
                    <a
                      className="btn"
                      onClick={() => SetDaySelected(dayjs("2024-06-30"))}
                    >
                      30/06/2024
                    </a>
                  </h6>

                  <Basic />
                </div>
              </div>
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0 p-2">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Protocolo</h2>
                  <a
                    className="btn p-0 m-0 text-body-secondary"
                    onClick={() => console.log("formato")}
                  >
                    Descargar formato <i className="bi bi-download"></i>
                  </a>
                  <h6>
                    Fecha limite:{" "}
                    <a
                      className="btn"
                      onClick={() => SetDaySelected(dayjs("2024-07-05"))}
                    >
                      05/07/2024
                    </a>
                  </h6>

                  <Basic />
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
            <div className="col-sm-6 mb-3 mb-sm-0 p-2">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Informe</h2>
                  <a
                    className="btn p-0 m-0 text-body-secondary"
                    onClick={() => console.log("formato")}
                  >
                    Descargar formato <i className="bi bi-download"></i>
                  </a>
                  <h6>
                    Fecha limite:{" "}
                    <a
                      className="btn"
                      onClick={() => SetDaySelected(dayjs("2024-10-12"))}
                    >
                      12/10/2024
                    </a>
                  </h6>

                  <Basic />
                </div>
              </div>
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0 p-2">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Carta de tercero</h2>
                  <a
                    className="btn p-0 m-0 text-body-secondary"
                    onClick={() => console.log("formato")}
                  >
                    Descargar formato <i className="bi bi-download"></i>
                  </a>
                  <h6>
                    Fecha limite:{" "}
                    <a
                      className="btn"
                      onClick={() => SetDaySelected(dayjs("2024-10-12"))}
                    >
                      12/10/2024
                    </a>
                  </h6>

                  <Basic />
                </div>
              </div>
            </div>
          </div>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Paper sx={{ width: 280, height: 400 }}>
            <DemoContainer components={["DateCalendar"]}>
              <DemoItem>
                <DateCalendar
                  sx={{ width: 250, height: 370 }}
                  value={daySelected}
                  readOnly
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    SetDaySelected(
                      dayjs(
                        hoy.getFullYear() +
                          "-" +
                          (hoy.getMonth() + 1) +
                          "-" +
                          hoy.getDate()
                      )
                    )
                  }
                >
                  Hoy
                </Button>
              </DemoItem>
            </DemoContainer>
          </Paper>
        </LocalizationProvider>
      </div>
    </div>
  );
}