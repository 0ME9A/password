import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { toggleHistoryBookmark } from "../../RTK/slices/history";
import { useDispatch, useSelector } from "react-redux";
import { setInstantCopy, setSalt } from "../../RTK/slices/setting";
import { RootState } from "../../RTK/store";
import { SETTINGS } from "../../RTK/type";

import ThemeSwitch from "../../components/buttons/ThemeSwitch";
import WindowBack from "../../components/buttons/WindowBack";
import CharDropDown from "../../components/dropdowns/CharDropDown";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import React from "react";

function Settings() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    historyProps: { bookmark },
    activeWindow,
    settingProps: { salt, instantCopy },
  } = useSelector((state: RootState) => state);

  const palette = theme.palette;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          backgroundColor: palette.background.paper,
          position: "relative",
          top: 0,
          width: "100%",
          maxHeight: "600px",
          height: "500px",
          transition: ".3s",
          zIndex: activeWindow.tab === SETTINGS ? 5 : 0,
          animationDuration: activeWindow.timer || 0,
          overflow: "auto",
        }}
        className={`${
          activeWindow.tab === SETTINGS && "windowSlideStartRight"
        } ${activeWindow.timer && "windowSlideEndRight"} `}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WindowBack />
            <Typography
              variant="h2"
              sx={{ fontSize: "1rem", fontWeight: "bold", pl: 1 }}
            >
              Settings
            </Typography>
          </Box>
        </Box>
        <hr />
        <Box>
          <List sx={{ width: "100%" }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Theme"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Dark Mode
                    </Typography>
                    {" — Toggle to activate dark and light mode…"}
                  </React.Fragment>
                }
              />
              <ThemeSwitch />
            </ListItem>
            {/* <Divider component="li" /> */}
            <ListItem
              alignItems="flex-start"
              sx={{ borderBottom: 1, borderColor: "rgb(150, 150, 150, .3)" }}
            >
              <ListItemText
                primary="History"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Password history
                    </Typography>
                    {" — Bookmark history button on the header..."}
                  </React.Fragment>
                }
              />
              <Checkbox
                checked={bookmark}
                onChange={() => dispatch(toggleHistoryBookmark(!bookmark))}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItem>
            <ListItem>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mt: 1, fontSize: "1rem" }}
              >
                Advanced Settings
              </Typography>
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Salt"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Salt string
                    </Typography>
                    {
                      " — A custom string added to the password before hashing for enhanced security..."
                    }
                  </React.Fragment>
                }
              />
              <Checkbox
                checked={salt}
                onChange={() => dispatch(setSalt(!salt))}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Auto Copy"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Auto copy password
                    </Typography>
                    {
                      " — Automatically copy a newly generated password without the need for an additional click on the copy button..."
                    }
                  </React.Fragment>
                }
              />
              <Checkbox
                checked={instantCopy}
                onChange={() => dispatch(setInstantCopy(!instantCopy))}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItem>

            <CharDropDown></CharDropDown>
          </List>
        </Box>
      </Paper>
    </>
  );
}

export default Settings;
