import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../../components/news/Search";
import { Stack, Box, Grid, Select, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RenderNews from "../../components/news/RenderNews";
import Header from "../../components/header/Header";
import { connect } from "react-redux";
import { axiosGetRequest } from "../../config/request";

const sortByArray = [
  { name: "Recent First", value: "publishedAt" },
  { name: "Popular", value: "popularity" },
];
const searchBy = [
  { name: "Search By Category", value: "searchCategory" },
  { name: "Search By Source", value: "searchSource" },
];

const sourcesData = [
  {
    id: 1,
    name: "BBC NEWS",
    value: "bbc-news",
  },
  {
    id: 2,
    name: "ABC NEWS",
    value: "abc-news",
  },
];

const EveryNews = ({ country, language, category,authToken }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState();
  const [selected, setSelected] = useState(sortByArray[0].value);
  const [search, setSearch] = useState("all");
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const allNewsData =  await axiosGetRequest(`/news/everything?keyword=${search}&sortBy=${selected}&pageSize=${pageSize}&page=1`, authToken)
      setNewsData(allNewsData.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [selected, search, pageSize]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPageSize(pageSize + 20);
  };

  return (
    <>
      <Header title={"Everything News"} />
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
        <Grid
          container
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <SearchBox handleSearchChange={handleSearchChange} />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box sx={{ bgcolor: "white" }}>
              <Select value={selected} size="small" onChange={handleSortChange}>
                {sortByArray.map((list) => (
                  <MenuItem
                    key={list.name}
                    value={list.value}
                    sx={{ fontSize: "14px" }}
                  >
                    {list.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>
        <RenderNews
          isLoading={isLoading}
          newsData={newsData}
          pageSize={pageSize}
          handleLoadMore={handleLoadMore}
        />
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
const msp = ({auth}) => ({
  authToken:auth.authToken
});
const mdp = (dispatch) => ({});

export default connect(msp, mdp)(EveryNews);
