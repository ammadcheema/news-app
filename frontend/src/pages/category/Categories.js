import React from "react";
import Header from "../../components/header/Header";
import {
  Stack,
  Box,
  imageListItemClasses,
  Paper,
  ImageListItem,
  Button,
  ImageListItemBar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import "./Categories.css";
import { setCategory } from "../../redux/actions";
import { connect } from "react-redux";

const Categories = ({ setCategory }) => {
  const categories = [
    {
      name: "business",
      image: `${window.location.origin}/images/business.jpeg`,
    },
    {
      name: "entertainment",
      image: `${window.location.origin}/images/entertainment.jpeg`,
    },
    {
      name: "general",
      image: `${window.location.origin}/images/general.jpeg`,
    },
    { name: "health", image: `${window.location.origin}/images/health.jpeg` },
    {
      name: "science",
      image: `${window.location.origin}/images/science.jpeg`,
    },
    { name: "sports", image: `${window.location.origin}/images/sports.jpeg` },
    {
      name: "technology",
      image: `${window.location.origin}/images/technology.jpeg`,
    },
  ];
  const classes = useStyles();
  const handleCategoryClick = (event) => {
    const categoryName = event.currentTarget.getAttribute("data-button-key");
    setCategory({
      category: categoryName,
      from: "Categories-handleClickCategory",
    });
    console.log();
  };
  return (
    <>
      <Header title="Categories" />
      <Stack
        className={classes.mediaContainer}
        sx={{
          padding: {
            xs: "24px 14px 24px 14px",
            sm: "44px 14px 44px 14px",
            md: "44px 44px 44px 44px",
            lg: "44px 104px 44px 104px",
          },
        }}
      >
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
          {categories.map((item) => (
            <Paper elevation={24} key={item.name}>
              <ImageListItem
                key={item.image}
                sx={{ height: "100% !important" }}
              >
                <div className="container">
                  <img
                    className="image"
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <div className="middle">
                    <div className="layOver"></div>
                    <div className="button">
                      <Button
                        component={Link}
                        to={`/topnews`}
                        data-button-key={item.name}
                        onClick={handleCategoryClick}
                        size="large"
                        variant="outlined"
                        sx={{
                          "&:hover": {
                            backgroundColor: "#FEC20C",
                            color: "#000",
                          },
                        }}
                      >
                        Go Now
                      </Button>
                    </div>
                  </div>
                </div>

                <ImageListItemBar
                  title={item.name.toUpperCase()}
                  sx={{ textAlign: "center" }}
                />
              </ImageListItem>
            </Paper>
          ))}
        </Box>
      </Stack>
    </>
  );
};

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },
  mediaContainer: {
    backgroundColor: "#ebecf0",
  },
});

const msp = ({}) => ({});

const mdp = (dispatch) => ({
  setCategory: (category, from) => dispatch(setCategory(category, from)),
});

export default connect(msp, mdp)(Categories);
