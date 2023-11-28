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
import { removeHistory } from "../../RTK/slices/history";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../RTK/store";
import { HISTORY } from "../../RTK/type";
import { useState, useEffect } from "react";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import WindowBack from "../../components/buttons/WindowBack";
import copyToClipboard from "../../utils/copyToClipboard";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

interface copyHistoryItemFace {
  id: string;
  password: string;
}

function History({ page = false }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectHistoryItem, setHistoryItem] = useState<string[]>([]);
  const [copyPassword, setCopyPassword] = useState<copyHistoryItemFace>({
    id: "",
    password: "",
  });
  const { history, activeWindow } = useSelector((state: RootState) => state);
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const palette = theme.palette;

  useEffect(() => {
    setHistoryItem([])
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleHistoryItemSelection = (historyId: string) => {
    if (selectHistoryItem.includes(historyId)) {
      const uncheck = selectHistoryItem.filter((id) => id !== historyId);
      setHistoryItem(uncheck);
    } else {
      setHistoryItem((prev) => [...prev, historyId]);
    }
  };

  const handleSelectAll = () => {
    const allHistoryId = history.map((item) => item.time);
    if (history.length === selectHistoryItem.length) {
      setHistoryItem([]);
      return;
    }
    setHistoryItem(allHistoryId);
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
          position: "relative",
          top: 0,
          width: "100%",
          transition: ".3s",
          height: !page ? "500px" : "auto",
          zIndex: activeWindow.tab === HISTORY ? 5 : 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animationDuration: activeWindow.timer || 0,
        }}
        className={`${
          activeWindow.tab === HISTORY && !page && "windowSlideStartRight"
        } ${activeWindow.timer && !page && "windowSlideEndRight"} `}
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
            <WindowBack page={page} />
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
              {selectHistoryItem.length} / {history.length}
            </Typography>
          </Box>
          <Box sx={{}}>
            {!page && (
              <IconButton
                onClick={() => navigate("/history")}
                sx={{
                  borderRadius: 2,
                  minWidth: 0,
                  p: small ? 0.8 : "auto",
                  fontSize: "1.2rem",
                  mr: "1rem",
                }}
              >
                <MdOutlineZoomOutMap />
              </IconButton>
            )}
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
        </Box>
        <hr style={{ opacity: 0.1 }} />
        {history.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              px: 2,
            }}
          >
            <div></div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: ".9rem",
                  px: 1,
                }}
              >
                Select All
              </Typography>

              <Checkbox
                checked={selectHistoryItem.length === history.length}
                onChange={handleSelectAll}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
          </Box>
        )}
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
                        onChange={() => handleHistoryItemSelection(item.time)}
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
