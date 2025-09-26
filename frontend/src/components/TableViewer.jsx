import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const paginationModel = { page: 0, pageSize: 5 };

export default function TableViewer({ columns, rows, onSelectionModelChange, selectedIds, checkboxSelection = false }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Acción no disponible
        </Alert>
      </Collapse>
      <Paper sx={{ height: "auto", width: "99.5%" }}>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Exportar a csv
        </Button>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Exportar a pdf
        </Button>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          checkboxSelection={checkboxSelection}
          selectionModel={selectedIds}
          onRowSelectionModelChange={
            checkboxSelection
              ? (ids) => onSelectionModelChange && onSelectionModelChange(ids)
              : undefined
          }
          onRowClick={
            !checkboxSelection
              ? (params) => onSelectionModelChange && onSelectionModelChange([params.id])
              : undefined
          }
        />

      </Paper>
    </>
  );
}
