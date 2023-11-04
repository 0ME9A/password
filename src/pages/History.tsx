import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeHistory } from "../RTK/slices/history";
import { RootState } from "../RTK/store";
import { useState } from "react";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import WindowBack from "../components/buttons/WindowBack";
import copyToClipboard from "../utils/copyToClipboard";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

interface copyHistoryItemFace {
  id: string;
  password: string;
}

function History() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectHistoryItem, setHistoryItem] = useState<string[]>([]);
  const [copyPassword, setCopyPassword] = useState<copyHistoryItemFace>({
    id: "",
    password: "",
  });
  const { history, activeWindow } = useSelector((state: RootState) => state);
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const palette = theme.palette;

  const handleHistroyItemSelection = (historyId: string) => {
    if (selectHistoryItem.includes(historyId)) {
      const uncheck = selectHistoryItem.filter((id) => id !== historyId);
      setHistoryItem(uncheck);
    } else {
      setHistoryItem((prev) => [...prev, historyId]);
    }
  };

  const handleCopy = async ({ id, password }: copyHistoryItemFace) => {
    await copyToClipboard(password);
    setCopyPassword({ id, password });

    setTimeout(() => {
      setCopyPassword({ id: "", password: "" });
    }, 5000);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          backgroundColor: palette.background.paper,
          position: "absolute",
          top: 0,
          width: "100%",
          left: activeWindow === "history" ? "0" : "100%",
          transition: ".3s",
          height: "100%",
          zIndex: activeWindow === "history" ? 5 : 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
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
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              History
              <span
                style={{
                  display: "inline-block",
                  height: "1.5rem",
                  border: "1px solid rgb(150, 150, 150, .2)",
                }}
              ></span>
              {history.length}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => dispatch(removeHistory(selectHistoryItem))}
            title="Delete history"
            sx={{
              gap: 1,
              borderRadius: 2,
              minWidth: 0,
              bgcolor: "red",
              p: small ? 0.5 : "auto",
              fontWeight: "bold",
              ":hover": { bgcolor: "rgb(140, 0, 0)" },
            }}
          >
            {!small && "Delete"}
            <DeleteIcon />
          </Button>
        </Box>
        <hr style={{ opacity: 0.1 }} />
        {history?.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: "center" }}>
            No record found.
          </Typography>
        ) : (
          <List dense sx={{ width: "100%", overflowY: "auto" }}>
            {history.map((item, i) => {
              const time = new Date(item.time);
              return (
                item.password.length > 0 && (
                  <ListItem
                    alignItems="center"
                    key={i}
                    sx={{
                      borderBottom: 0.5,
                      borderColor: "rgb(150, 150, 150, .1)",
                    }}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{
                            fontWeight: "bold",
                            paddingBottom: ".5rem",
                            fontSize: "1rem",
                          }}
                        >
                          {item.password}
                        </span>
                      }
                      sx={{ fontSize: "1rem", fontWeight: "bold" }}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            fontSize={"0.8rem"}
                          >
                            {"Password strength —  "}
                          </Typography>
                          <span
                            style={{
                              display: "inline",
                              color: item.strength.color,
                            }}
                          >
                            {item.strength.message}
                          </span>
                          <span style={{ opacity: 0.7, display: "block" }}>
                            Time:- {time.toLocaleTimeString()}
                          </span>
                        </>
                      }
                    />

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleCopy({ id: item.time, password: item.password })
                        }
                        title={`${
                          copyPassword.id === item.time ? "Copied" : "Copy"
                        }`}
                        sx={{
                          p: ".5",
                          m: 0,
                          minWidth: "0",
                          borderRadius: 2,
                          color: `${
                            copyPassword.id === item.time ? "green" : ""
                          }`,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ContentPasteIcon />
                      </IconButton>
                      <div
                        style={{
                          width: "1px",
                          height: "1.5rem",
                          backgroundColor: "rgb(150, 150, 150, .5)",
                        }}
                      ></div>
                      <Checkbox
                        checked={selectHistoryItem.includes(item.time)}
                        onChange={() => handleHistroyItemSelection(item.time)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                  </ListItem>
                )
              );
            })}
          </List>
        )}
      </Paper>
    </>
  );
}

export default History;
