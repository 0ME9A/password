import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

import ThemeSwitch from "./components/switch/ThemeSwitch";
import ColorModeContext from "./context/ThemeContext";
import Box from "@mui/material/Box";

import "./App.css";

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
              p: 3,
              minHeight: "100vh",
            }}
          >
            <ThemeSwitch />
          </Box>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
