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
        bgcolor: "background.default",
        color: "text.primary",
        py: 3,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        gap: 1,
      }}
    >
      <Suspense fallback={<InitialLoading />}>
        <PasswordGenerator />
      </Suspense>
    </Box>
  );
}

export default Main;
