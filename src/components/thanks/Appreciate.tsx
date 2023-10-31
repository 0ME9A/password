import { useTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function Appreciate() {
  const { palette } = useTheme();

  return (
    <Box>
      <Typography
        fontSize={"0.8rem"}
        padding={3}
        sx={{ opacity: 0.7, color: palette.text.primary }}
      >
        Developed and designed by{" "}
        <Link
          href={"https://ome9a.com"}
          target="_blank"
          rel="external"
          fontWeight={"900"}
          color={palette.text.primary}
        >
          Baliram Singh
        </Link>{" "}
        with <span style={{ color: "red" }}>❤️️</span>{" "}
      </Typography>
    </Box>
  );
}

export default Appreciate;
