import { useState } from "react";
import {
  Button,
  Checkbox,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PasswordAttributesType } from "../types/PasswordAttributesType";
import { useDispatch, useSelector } from "react-redux";
import { addHistory } from "../../RTK/slices/history";
import { RootState } from "../../RTK/store";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import generatePassword from "../../utils/generatePassword";
import copyToClipboard from "../../utils/copyToClipboard";
import CachedIcon from "@mui/icons-material/Cached";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

const PrettoSlider = styled(Slider)({
  // color: "rgb(0, 0, 155)",
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
  const dispatch = useDispatch();
  const {
    history,
    activeWindow,
    settingProps: { salt },
  } = useSelector((state: RootState) => state);
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

  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const mode = theme.palette.mode;
  const palette = theme.palette;
  const boxShadow = `0px 3px 15px ${
    mode === "dark" ? "rgb(150, 150, 150, .1)" : "rgb(150, 150, 150, .2)"
  }`;

  const handlePP = () => {
    const t = new Date();
    const x = generatePassword(pp);
    dispatch(addHistory({ ...x, time: t.toISOString() }));
    setCopy(false);
    console.log(history);
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
    const x = await copyToClipboard(history[0]?.password);
    setCopy(x);

    setTimeout(() => {
      setCopy(false);
    }, 5000);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          backgroundColor: palette.background.paper,
          height: "100%",
          width: "100%",
          position: "relative",
          left: activeWindow ? "-100%" : "0%",
          transition: ".3s",
        }}
      >
        <Stack spacing={1} sx={{ p: 1 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              background: "transparent",
              border: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: boxShadow,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              {history[0]?.password}
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
                display: "flex",
                alignItems: "center",
              }}
            >
              <ContentPasteIcon />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            px={1}
            color={history[0]?.strength.color}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {history[0]?.strength.message && <InfoIcon />}
            {history[0]?.strength.message}
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: boxShadow,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                Password length{" "}
                <Typography
                  variant="body2"
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                    bgcolor: palette.text.primary,
                    color: palette.background.default,
                    p: 0.5,
                    borderRadius: "100%",
                  }}
                >
                  {pp.length}
                </Typography>
              </div>
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{
                  gap: 1,
                  borderRadius: 2,
                  minWidth: 0,
                  p: small ? 0.5 : "auto",
                  fontWeight: "bold",
                }}
              >
                {!small && "Reset"}
                <RotateLeftIcon />
              </Button>
            </Box>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="password length"
              value={pp.length}
              min={1}
              max={32}
              sx={{
                pt: 3,
                ".MuiSlider-valueLabel": {
                  backgroundColor: palette.primary.main,
                },
              }}
              onChange={(e, nValue) =>
                setPP((prev) => ({ ...prev, length: nValue }))
              }
            />
          </Box>
          <FormControlLabel
            control={<Checkbox />}
            label="Uppercase (A-Z)"
            labelPlacement="start"
            checked={pp.upper}
            onChange={() => setPP((prev) => ({ ...prev, upper: !prev.upper }))}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pl: 1,
              borderRadius: 2,
              boxShadow: boxShadow,
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Lowercase (a-z)"
            labelPlacement="start"
            checked={pp.lower}
            onChange={() => setPP((prev) => ({ ...prev, lower: !prev.lower }))}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pl: 1,
              borderRadius: 2,
              boxShadow: boxShadow,
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
              display: "flex",
              justifyContent: "space-between",
              pl: 1,
              borderRadius: 2,
              boxShadow: boxShadow,
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
              display: "flex",
              justifyContent: "space-between",
              pl: 1,
              borderRadius: 2,
              boxShadow: boxShadow,
            }}
          />

          {salt && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Typography variant="body1" fontWeight={"bold"}>
                  Advance Settings
                </Typography>
              </Box>

              <Box sx={{ borderRadius: 2, p: 1 }}>
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
              </Box>
            </>
          )}
          {/**/}
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
    </>
  );
}

export default PasswordGenerator;
