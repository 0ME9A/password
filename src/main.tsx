import { Suspense, lazy } from "react";

import InitialScreen from "./initialScreen";
import Box from "@mui/material/Box";

const PasswordGenerator = lazy(
  () => import("./components/password/PasswordGenerator")
  );

function Main() {
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
        <Box sx={{ height: "3rem" }}></Box>
        <PasswordGenerator />
      </Suspense>
    </Box>
  );
}

export default Main;
