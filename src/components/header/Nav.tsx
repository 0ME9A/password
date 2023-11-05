import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import GroupsIcon from "@mui/icons-material/Groups";
import Box from "@mui/material/Box";

function Nav() {
  const getTheme = useTheme();
  const {
    palette,
    palette: { mode },
  } = getTheme;
  const boxShadow = `0px 3px 15px ${
    mode === "dark" ? "rgb(150, 150, 150, .3)" : "rgb(150, 150, 150, .5)"
  }`;
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
        <Box
          sx={{
            borderRadius: 3,
            padding: 1,
            boxShadow: boxShadow,
            bgcolor: palette.background.default,
          }}
        >
          <Link
            to={"/about"}
            title="About"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: palette.text.primary,
            }}
          >
            <GroupsIcon sx={{}} />
          </Link>
        </Box>
        <Box
          sx={{
            borderRadius: 3,
            padding: 1,
            boxShadow: boxShadow,
            bgcolor: palette.background.default,
          }}
        >
          <Link
            to={"https://github.com/0ME9A/password"}
            target="_blank"
            title="GitHub"
            rel="external"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: palette.text.primary,
            }}
          >
            <GitHubIcon sx={{}} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Nav;
