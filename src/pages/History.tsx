import { Container, useTheme } from "@mui/material";

import HistoryTab from "./Tabs/History";

function History() {
  const { palette } = useTheme();

  return (
    <>
      <Container
        sx={{
          bgcolor: palette.background.default,
          color: palette.text.primary,
          overflow: "hidden",
          padding: 1,
        }}
      >
        <HistoryTab page={true} />
      </Container>
    </>
  );
}

export default History;
