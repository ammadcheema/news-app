import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NewsCard = ({ item }) => {
  return (
    <>
      <Card
        key={item.publishedDate}
        elevation={2}
        component={Link}
        to={`${item.url}`}
        display="flex"
        target="_blank"
        sx={{
          display: "flex",
          cursor: "pointer",
          backgroundColor: "#333333",
          color: "white",
          "&:hover": {
            backgroundColor: "#111111",
          },
          textDecoration: "none",
        }}
      >
        <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
          <img
            style={{
              maxWidth: "100%",
              transition: "0.5s ease",
              backfaceVisibility: "hidden",
            }}
            src={`${item.urlToImage}`}
            srcSet={`${item.urlToImage}`}
            alt={item.title}
            loading="lazy"
          />
          <Box display="flex" flexDirection="column" sx={{ mt: 1 }}>
            <Typography
              sx={{
                mt: 2,
                fontSize: "14px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Typography>
            <Box display="flex" flexDirection="row" justifyContent="left">
              <Typography sx={{ mt: 1, fontSize: "14px" }}>
                {item.description && item.description.length > 20
                  ? item.description.substring(0, 40)
                  : item.description}
                ...
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#FEC20C",
                  fontWeight: "bold",
                }}
              >
                {item.author}
              </Typography>

              <Typography sx={{ fontSize: "14px", color: "white" }}>
                {item.publishedAt}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "white" }}>
                {item.source.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default NewsCard;
