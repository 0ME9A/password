import { useTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function About() {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        textAlign: "center",
        color: palette.text.primary,
      }}
    >
      <Typography>The page is under construction. 🧑🏻‍💻</Typography>
    </Box>
  );
}

export default About;
