import React from "react";
import NewsCard from "./NewsCard";
import {
  Box,
  Button,
  CircularProgress,
  imageListItemClasses,
} from "@mui/material";

const RenderNews = ({ isLoading, newsData, pageSize, handleLoadMore }) => {
  
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#FEC20C",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "transparent",
              mt: 2,
              display: "grid",
              gap: 1,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              [`& .${imageListItemClasses.root}`]: {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {newsData && newsData.news.map((news) => (
              <NewsCard item={news} />
            ))}
          </Box>
          {newsData && pageSize <= newsData.totalResults && (
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleLoadMore}
                sx={{
                  bgcolor: "black",
                  width: { xs: "30vw", md: "20vw" },
                  color: "white",
                  "&:hover": { backgroundColor: "#FEC20C" },
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default RenderNews;
