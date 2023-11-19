import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";

import Nav from "./components/header/Nav";
import Box from "@mui/material/Box";
import Footer from "./components/footer/Footer";

function Layout() {
  const theme = useTheme();
  const palette = theme.palette;
  return (
    <>
      <Box
        sx={{
          backgroundColor: palette.background.default,
          minHeight: "100vh",
          position: "relative",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",

        }}
      >
        <Nav />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
