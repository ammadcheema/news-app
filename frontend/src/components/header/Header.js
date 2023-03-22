import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
        backgroundColor: "black",
      }}
    >
      <Typography
        variant="h3"
        component={"h6"}
        sx={{
          fontWeight: 900,
          textAlign: { xs: "center", sm: "left" },
          color: "white",
          fontSize: { xs: "26px", md: "40px" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
