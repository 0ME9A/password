import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense, lazy, useMemo, useState } from "react";

import InitialLoading from "./components/Loading/InitialLoading";
import ColorModeContext from "./context/ThemeContext";
import Box from "@mui/material/Box";

import "./App.css";

const PasswordGenerator = lazy(
  () => import("./components/password/PasswordGenerator")
);

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <main>
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
            }}
          >
            <Suspense fallback={<InitialLoading />}>
              <PasswordGenerator />
            </Suspense>
          </Box>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
