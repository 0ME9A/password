import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";
import backToMainTab from "../../utils/tabClose";

function WindowBack({ page = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    if (page) {
      navigate("/");
      return;
    }
    backToMainTab({ dispatch });
  };

  return (
    <IconButton title="Back" onClick={() => handleBack()}>
      <NavigateBeforeIcon />
    </IconButton>
  );
}

export default WindowBack;
