import React from "react";
import { Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        height: "10vh",
        bgcolor: "white",
        border: "2px solid #eeeeee",
        color: "black",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "black",
          marginY: "20px",
          "&:hover": { color: "#FEC20C" },
        }}
      >
        NewsApp
      </Box>
    </Paper>
  );
};

export default Footer;
