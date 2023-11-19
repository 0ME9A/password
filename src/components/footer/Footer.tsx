import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ flexGrow: 1, textAlign: "center", p: 5 }}>
      <Link to={"/privacy-policy"}>Privacy Policy</Link>
    </Box>
  );
}

export default Footer;
