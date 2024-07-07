import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ flexGrow: 1, textAlign: "center", p: 5 }}>
      <Link to={"/privacy-policy"} >Privacy Policy</Link>
      <Link to={"https://github.com/0ME9A/password"} > &copy; 2024 open source project </Link>
    </Box>
  );
}

export default Footer;
