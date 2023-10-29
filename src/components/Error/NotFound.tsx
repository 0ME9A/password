import { useRouteError } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function NotFound() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        gap: 1
      }}
    >
      <Typography variant="h1">Oops!</Typography>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <Link variant="body2" href="/">
        Return to Home
      </Link>
    </Box>
  );
}
