import { Container, IconButton, Paper, useTheme } from "@mui/material";
import { setWindowName } from "../RTK/slices/toggleWindow";
import { useDispatch, useSelector } from "react-redux";
import { HISTORY, SETTINGS } from "../RTK/type";
import { RootState } from "../RTK/store";
import { Suspense, lazy } from "react";

import PasswordGenerator from "../components/password/PasswordGenerator";
import Appreciate from "../components/thanks/Appreciate";
import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import Typography from "@mui/material/Typography";
import Settings from "./Tabs/Settings";
import History from "./Tabs/History";
import Box from "@mui/material/Box";

const TwitterShare = lazy(() => import("../components/buttons/TwitterShare"));

function Home() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const {
    historyProps: { bookmark },
    activeWindow,
  } = useSelector((state: RootState) => state);

  const palette = theme.palette;

  return (
    <>
      <Container maxWidth={"sm"} sx={{ p: 1 }}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 6,
            p: 1,
            background: palette.background.default,
            opacity: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              px: small ? 1 : 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <img src="/logo32.png" alt="brand logo" width={24} />
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Password Generator
              </Typography>
            </Box>

            <Suspense>
              <Box>
                <TwitterShare />
                {bookmark && (
                  <IconButton
                    title="History"
                    onClick={() => dispatch(setWindowName({ tab: HISTORY }))}
                  >
                    <HistoryIcon />
                  </IconButton>
                )}
                <IconButton
                  title="Settings"
                  onClick={() => dispatch(setWindowName({ tab: SETTINGS }))}
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Suspense>
          </Box>

          {/* --------------------- */}
          <Box
            sx={{
              minHeight: "400px",
              // height: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {!activeWindow.tab && <PasswordGenerator />}
            {activeWindow.tab === HISTORY && <History />}
            {activeWindow.tab === SETTINGS && <Settings />}
          </Box>
          {/* --------------------- */}
        </Paper>
      </Container>
      <Suspense>
        <Appreciate />
      </Suspense>
    </>
  );
}

export default Home;
