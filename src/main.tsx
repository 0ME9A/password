import { Suspense, lazy } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PasswordGenerator = lazy(
  () => import("./components/password/PasswordGenerator")
);

function InitialLoading() {
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        Loading...
      </Typography>
    </Box>
  );
}

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
      <Suspense fallback={<InitialLoading />}>
        <Box sx={{ height: "3rem" }}></Box>
        <PasswordGenerator />
      </Suspense>
    </Box>
  );
}

export default Main;
