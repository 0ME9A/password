import { useTheme } from "@mui/material/styles";
import { useContext } from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ColorModeContext from "../../context/ThemeContext";
import IconButton from "@mui/material/IconButton";

function ThemeSwitch() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <IconButton
      sx={{ ml: 1 }}
      title={`${
        theme.palette.mode === "dark"
          ? "Dark mode"
          : "Light mode"
      }`}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}

export default ThemeSwitch;
