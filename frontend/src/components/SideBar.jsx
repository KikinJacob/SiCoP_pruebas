import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemButton from "@mui/material/ListItemButton";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  zIndex: 1200,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  zIndex: 1200,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} />
      <Drawer variant="permanent" open={open}>
        <List style={{ paddingTop: 100 }}>
          {/* Mis Proyectos */}
          <Tooltip title="Mis Proyectos" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/Proyectos")}
            >
              <AssignmentIcon />
            </ListItemButton>
          </Tooltip>
          {/* Registrar Proyecto */}
          <Tooltip title="Registrar Proyecto" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/RegistroProyecto1")}
            >
              <AddCircleOutlineIcon />
            </ListItemButton>
          </Tooltip>
          {/* Captura de Documentos */}
          <Tooltip title="Captura de Documentos" placement="right">
            <ListItemButton
              style={{ marginBottom: 20, justifyContent: "center" }}
              onClick={() => navigate("/Detalles/Archivos")}
            >
              <DescriptionIcon />
            </ListItemButton>
          </Tooltip>
        </List>
      </Drawer>
    </Box>
  );
}

export default SideBar;