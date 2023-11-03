import { useTheme } from "@mui/material";
import { Suspense, lazy } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import InitialScreen from "./initialScreen";
import Box from "@mui/material/Box";

const Home = lazy(() => import("./pages/Home"));

function Main() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: 3,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        gap: 1,
      }}
    >
      <Suspense fallback={<InitialScreen />}>
        <Box sx={{ height: small ? "1rem" : "3rem" }}></Box>
        <Home />
      </Suspense>
    </Box>
  );
}

export default Main;
