import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function JoinUs() {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <Box
      component={"section"}
      sx={{
        width: "100%",
        p: 4,
        mt: 5,
        minHeight: "50vh",
        background: `linear-gradient(135deg, ${palette.background.default} 30%, ${palette.primary.main} 120%)`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        color: palette.text.primary,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" fontWeight={900}>
          JOIN US
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Contribute to our open-source project on GitHub and make a positive
          impact! Whether you're a developer, designer, or enthusiast, your
          contributions are valued and welcomed.
        </Typography>
        <Button
          href="https://github.com/0ME9A/password/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          startIcon={<GitHubIcon />}
          sx={{ borderRadius: 2, mt: 2 }}
        >
          Create an Issue
        </Button>
      </Container>
    </Box>
  );
}

export default JoinUs;
