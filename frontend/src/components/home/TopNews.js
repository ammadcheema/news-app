import React from "react";
import NewsCard from "../news/NewsCard";
import { Box, imageListItemClasses, Typography } from "@mui/material";

const TopNews = ({ topNews, about }) => {
  return (
    <>
      <Typography
        variant="h3"
        component={"h5"}
        sx={{
          fontWeight: 900,
          fontSize: "26px",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        TOP TRENDING NEWS {about && `OF ${about}`.toUpperCase()}
      </Typography>
      <Box
        sx={{
          backgroundColor: "transparent",
          mt: 2,
          display: "grid",
          gap: 1,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          [`& .${imageListItemClasses.root}`]: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {topNews && topNews.slice(0, 8).map((news) => (
          <NewsCard item={news} />
        ))}
      </Box>
      <hr
        style={{
          border: "0.5px solid grey",
          marginTop: "44px",
          width: "100%",
        }}
      ></hr>
    </>
  );
};

export default TopNews;
