import { Suspense, lazy } from "react";

import InitialLoading from "./components/loading/InitialLoading";
import Box from "@mui/material/Box";

const PasswordGenerator = lazy(
  () => import("./components/password/PasswordGenerator")
);

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
