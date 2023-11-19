import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { useMemo, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./RTK/store";

import ColorModeContext from "./context/ThemeContext";
import NotFound from "./components/Error/NotFound";
import PrivacyPolicy from "./pages/Privacy-policy";
import InitialScreen from "./initialScreen";
import History from "./pages/History";
import About from "./pages/About";
import Layout from "./layout";
import Main from "./main";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    loader: () => <InitialScreen />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/privacy-policy",
        element: (
          <PrivacyPolicy lastUpdated={"19 Nov 2023"} contactInformation={"heyome9a@gmail.com"} />
        ),
      },
      // Add more routes as children here if needed
    ],
  },
]);

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

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#aaaaff" : "#190482", // Light blue for light mode, dark blue for dark mode
      },
      secondary: {
        main: mode === "light" ? "#000080" : "#1565c0", // Lighter blue for light mode, darker blue for dark mode
      },
      background: {
        paper: mode === "light" ? "#eeeeff" : "#00001f", // Very light blue for light mode, very dark blue for dark mode
        default: mode === "light" ? "#ddddff" : "#11112f", // Very light blue for light mode, very dark blue for dark mode
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff", // Black for light mode, white for dark mode
      },
      // Add more colors as needed
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ColorModeContext.Provider>
  );
}
