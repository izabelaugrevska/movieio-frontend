import React from "react";
import { makeStyles } from "@mui/material";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "gray" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MovieIO
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button color="inherit" href="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
