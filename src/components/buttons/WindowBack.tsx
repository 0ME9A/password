import { setWindowName } from "../../RTK/slices/toggleWindow";
import { useDispatch } from "react-redux";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";

function WindowBack() {
  const dispatch = useDispatch();
  return (
    <IconButton title="Back" onClick={() => dispatch(setWindowName(""))}>
      <NavigateBeforeIcon />
    </IconButton>
  );
}

export default WindowBack;
