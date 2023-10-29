import { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  styled,
  useTheme,
} from "@mui/material";
import {
  PasswordAttributesType,
  PasswordReturnType,
} from "../types/PasswordAttributesType";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import generatePassword from "../../utils/generatePassword";
import copyToClipboard from "../../utils/copyToClipboard";
import CachedIcon from "@mui/icons-material/Cached";
import Typography from "@mui/material/Typography";
import ThemeSwitch from "../switch/ThemeSwitch";
import Box from "@mui/material/Box";

const PrettoSlider = styled(Slider)({
  color: "rgb(0, 0, 155)",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "rgb(0, 0, 155)",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

function PasswordGenerator() {
  const theme = useTheme();
  const [settings, setSettings] = useState(false);
  const [pp, setPP] = useState<PasswordAttributesType>({
    upper: true,
    lower: true,
    symbol: true,
    number: true,
    length: 8,
    salt: "",
    saltAt: "e",
  });
  const [isCopy, setCopy] = useState(false);
  const [password, setPassword] = useState<PasswordReturnType>({
    status: "success",
    result: "",
    message: "",
  });
  const mode = theme.palette.mode;

  const handlePP = () => {
    const x = generatePassword(pp);
    setPassword(x);
    setCopy(false);
    console.log(x);
  };
  const handleReset = () => {
    setPP((prev) => ({
      ...prev,
      upper: true,
      lower: true,
      symbol: true,
      number: true,
      length: 8,
      salt: "",
      saltAt: "e",
    }));
    setCopy(false);
  };
  const handleCopy = async () => {
    const x = await copyToClipboard(password.result);
    setCopy(x);

    setTimeout(() => {
      setCopy(false);
    }, 5000);
  };

  return (
    <>
      <Container maxWidth={"sm"}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: 6,
            p: 1,
            backgroundColor:
              mode === "dark" ? "rgb(0, 0, 25)" : "rgb(242, 244, 255)",
            opacity: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            
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

            <ThemeSwitch />
          </Box>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              backgroundColor:
                mode === "dark" ? "#0F1932" : "rgb(222, 224, 246)",
            }}
          >
            <Stack spacing={1} sx={{ p: 1 }}>
              <Paper
                elevation={4}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  background: "transparent",
                  border: 2,
                  borderColor: mode === "dark" ? "white" : "black",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  {password.result}
                </Typography>
                <IconButton
                  onClick={handleCopy}
                  title={`${isCopy ? "Copied" : "Copy"}`}
                  sx={{
                    p: ".5",
                    m: 0,
                    minWidth: "0",
                    borderRadius: 2,
                    color: `${isCopy ? "green" : ""}`,
                  }}
                >
                  <ContentPasteIcon sx={{}} />
                </IconButton>{" "}
              </Paper>

              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "top",
                  }}
                >
                  <Typography gutterBottom>Password length</Typography>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    sx={{ gap: 1, borderRadius: 2 }}
                  >
                    reset <RotateLeftIcon />
                  </Button>
                </Box>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="password length"
                  value={pp.length}
                  min={1}
                  max={32}
                  sx={{ pt: 3 }}
                  onChange={(e, nValue) =>
                    setPP((prev) => ({ ...prev, length: nValue }))
                  }
                />
              </Paper>

              <FormControlLabel
                control={<Checkbox />}
                label="Uppercase (A-Z)"
                labelPlacement="start"
                checked={pp.upper}
                onChange={() =>
                  setPP((prev) => ({ ...prev, upper: !prev.upper }))
                }
                sx={{
                  backgroundColor:
                    mode === "dark" ? "rgb(0, 0, 20)" : "rgb(242, 244, 255)",
                  display: "flex",
                  justifyContent: "space-between",
                  pl: 1,
                  borderRadius: 2,
                  boxShadow: `0px 3px 5px ${
                    mode === "dark"
                      ? "rgb(150, 150, 150, .1)"
                      : "rgb(150, 150, 150, .5)"
                  }`,
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Lowercase (a-z)"
                labelPlacement="start"
                checked={pp.lower}
                onChange={() =>
                  setPP((prev) => ({ ...prev, lower: !prev.lower }))
                }
                sx={{
                  backgroundColor:
                    mode === "dark" ? "rgb(0, 0, 20)" : "rgb(242, 244, 255)",
                  display: "flex",
                  justifyContent: "space-between",
                  pl: 1,
                  borderRadius: 2,
                  boxShadow: `0px 3px 5px ${
                    mode === "dark"
                      ? "rgb(150, 150, 150, .1)"
                      : "rgb(150, 150, 150, .5)"
                  }`,
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Symbols (!@#$)"
                labelPlacement="start"
                checked={pp.symbol}
                onChange={() =>
                  setPP((prev) => ({ ...prev, symbol: !prev.symbol }))
                }
                sx={{
                  backgroundColor:
                    mode === "dark" ? "rgb(0, 0, 20)" : "rgb(242, 244, 255)",
                  display: "flex",
                  justifyContent: "space-between",
                  pl: 1,
                  borderRadius: 2,
                  boxShadow: `0px 3px 5px ${
                    mode === "dark"
                      ? "rgb(150, 150, 150, .1)"
                      : "rgb(150, 150, 150, .5)"
                  }`,
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Numbers (0-9)"
                labelPlacement="start"
                checked={pp.number}
                onChange={() =>
                  setPP((prev) => ({ ...prev, number: !prev.number }))
                }
                sx={{
                  backgroundColor:
                    mode === "dark" ? "rgb(0, 0, 20)" : "rgb(242, 244, 255)",
                  display: "flex",
                  justifyContent: "space-between",
                  pl: 1,
                  borderRadius: 2,
                  boxShadow: `0px 3px 5px ${
                    mode === "dark"
                      ? "rgb(150, 150, 150, .1)"
                      : "rgb(150, 150, 150, .5)"
                  }`,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Typography variant="body1">Advance Settings</Typography>
                <Button
                  variant="contained"
                  title={`${settings ? "Hide" : "Show"} advanced settings`}
                  onClick={() => setSettings(!settings)}
                  sx={{
                    gap: 1,
                    borderRadius: 2,
                    minWidth: "fit-content",
                    p: 0.5,
                  }}
                >
                  <KeyboardArrowDownIcon
                    sx={{ rotate: settings ? "180deg" : 0, transition: ".3s" }}
                  />
                </Button>
              </Box>
              {settings && (
                <Paper elevation={4} sx={{ borderRadius: 2, p: 1 }}>
                  <TextField
                    id="outlined-basic"
                    label="Add Salt"
                    variant="outlined"
                    value={pp.salt}
                    onChange={(e) =>
                      setPP((prev) => ({ ...prev, salt: e.target.value }))
                    }
                    sx={{ width: "100%" }}
                  />
                  <FormControl sx={{ p: 1, pt: 2 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Position
                    </FormLabel>
                    <RadioGroup
                      row
                      // defaultValue={"e"}
                      value={pp.saltAt}
                      onChange={(e) =>
                        setPP((prev) => ({ ...prev, saltAt: e.target.value }))
                      }
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="s"
                        control={<Radio />}
                        label="Start"
                      />
                      <FormControlLabel
                        value="b"
                        control={<Radio />}
                        label="Between"
                      />
                      <FormControlLabel
                        value="e"
                        control={<Radio />}
                        label="End"
                      />
                    </RadioGroup>
                  </FormControl>
                </Paper>
              )}

              <hr style={{ opacity: ".1" }} />

              <Button
                variant="contained"
                endIcon={<CachedIcon />}
                onClick={handlePP}
                sx={{ borderRadius: 2, fontWeight: "bold", py: 1 }}
              >
                Generate Password
              </Button>
            </Stack>
          </Paper>
        </Paper>
      </Container>
    </>
  );
}

export default PasswordGenerator;
