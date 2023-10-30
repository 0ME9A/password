import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";

import Nav from "./components/header/Nav";
import Box from "@mui/material/Box";

function Layout() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1513346940221-6f673d962e97?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          backgroundColor:
            mode === "dark" ? "rgb(0, 0, 25, .9)" : "rgb(230, 230, 255, .9)",
          color: "text.primary",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Nav />
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
