import { Fab, Paper, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import GroupsIcon from "@mui/icons-material/Groups";
import Box from "@mui/material/Box";

function Nav() {
  const getTheme = useTheme();
  const theme = getTheme.palette.mode;

  return (
    <Box
      sx={{
        p: 2,
        gap: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{}}>
        <img
          src="https://raw.githubusercontent.com/0ME9A/0ME9A/main/0ME9A/imgs/logo.png"
          alt="Parent brand logo"
          width={48}
        />
        <img
          src="/logo32.png"
          alt="logo"
          width={24}
          style={{ position: "relative", left: "-20%" }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Fab
          variant="extended"
          size="small"
          sx={{ p: 0, borderRadius: 3, bgcolor: "transparent" }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: 3,
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              background: theme === "dark" ? "#0F1932" : "rgb(242, 244, 255)",
              color: "primary",
              padding: 1,
            }}
          >
            <Link
              to={"/about"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme === "dark" ? "white" : "black",
              }}
            >
              <GroupsIcon sx={{}} />
            </Link>
          </Paper>
        </Fab>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            display: "flex",
          }}
        >
          <Fab
            variant="extended"
            size="small"
            sx={{ p: 0, borderRadius: 3, bgcolor: "transparent" }}
          >
            <Paper
              elevation={6}
              sx={{
                borderRadius: 3,
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                background: theme === "dark" ? "#0F1932" : "rgb(242, 244, 255)",
                color: "primary",
                padding: 1,
              }}
            >
              <Link
                to={"https://github.com/0ME9A/password"}
                target="_blank"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                <GitHubIcon sx={{}} />
              </Link>
            </Paper>
          </Fab>
        </Paper>
      </Box>
    </Box>
  );
}

export default Nav;
