import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RenderNews from "../../components/news/RenderNews";
import SettingsDialog from "../../components/settings/Settings";
import {
  Stack,
  Box,
  Grid,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import TopHeadlineFilter from "../../components/topheadlines/TopHeadlineFilter";
import { axiosGetRequest } from "../../config/request";

const TopHeadlines = ({ country, language, category,authToken }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState();
  const [selected, setSelected] = useState(sortByArray[0].value);
  const [toggleSearch, setToggleSearch] = useState("searchCategory");
  const [sources, setSources] = useState([]);
  const [sourcesData,setSourceData] = useState([]);
  const [search, setSearch] = useState("all");
  const [pageSize, setPageSize] = useState(20);

  useEffect(()=>{
    const getData =async()=>{ 
      const sourcesDataNews = await axiosGetRequest(`/news/sources`, authToken)
        setSourceData(sourcesDataNews.data.data);
      }
      getData()
    },[])

  useEffect(() => {
    const fetchData = async () => {
      let getData;
      setIsLoading(true);
      if (toggleSearch === "searchCategory") {
        getData = await axiosGetRequest(`/news/topHeadlines?country=${country}&category=${category}&language=${language}&keyword=${search}&sortBy=${selected}&pageSize=${pageSize}&page=0`, authToken)
      } else {
        const allSources = sources.map((x) => x.id);
        getData =  await axiosGetRequest(`/news/topHeadlines?sources=${allSources.toString()}&keyword=${search}&sortBy=${selected}&pageSize=${pageSize}&page=0`, authToken)
      }
      setNewsData(getData.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [
    selected,
    search,
    pageSize,
    country,
    language,
    category,
    sources,
    toggleSearch,
  ]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  const handleToggleSearch = (value) => {
    setToggleSearch(value);
  };

  const handleSetSources = (value) => {
    setSources(value);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPageSize(pageSize + 20);
  };

  return (
    <>
      <SettingsDialog />
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
        <Grid container md={12}>
          <Grid
            item
            md={4}
            sx={{
              display: { xs: "none", sm: "none", md: "grid" },height:"50vh"
            }}
          >
            {" "}
            <Paper
              elevation={3}
              sx={{
                bgcolor: "white",
                mr: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "black",
                  color: "white",
                  p: 1,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{ fontSize: "18px", fontWeight: "bold", mr: 1 }}
                >
                  Filter By{" "}
                  {toggleSearch === "searchCategory" ? "Category" : "Sources"}
                </Typography>
              </Box>
              <TopHeadlineFilter
                toggleSearch={toggleSearch}
                selected={selected}
                handleSortChange={handleSortChange}
                sortByData={sortByArray}
                handleSearchChange={handleSearchChange}
                sourcesData={sourcesData}
                sources={sources}
                handleToggleSearch={handleToggleSearch}
                searchByData={searchBy}
                handleSetSources={handleSetSources}
              />
            </Paper>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              display: { xs: "flex", sm: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
              width: "95vw",
            }}
          >
            <Paper
              elevation={3}
              sx={{ bgcolor: "white", m: 2, width: { md: "50vw" } }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: "white",
                        "&:hover": {
                          color: "rgb(255, 192, 1)",
                        },
                      }}
                    />
                  }
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    "&:hover": {
                      color: "rgb(255, 192, 1)",
                    },
                  }}
                >
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: "bold", mr: 1 }}
                  >
                    Filter By{" "}
                    {toggleSearch === "searchCategory" ? "Category" : "Sources"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TopHeadlineFilter
                    toggleSearch={toggleSearch}
                    selected={selected}
                    handleSortChange={handleSortChange}
                    sortByData={sortByArray}
                    handleSearchChange={handleSearchChange}
                    sourcesData={sourcesData}
                    sources={sources}
                    handleToggleSearch={handleToggleSearch}
                    searchByData={searchBy}
                    handleSetSources={handleSetSources}
                  />
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
          <Grid item md={8}>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                height: { xs: "5vh", md: "10vh" },
                backgroundColor: "black",
                
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "16px", md: "30px" },
                  textAlign: { xs: "center", sm: "left" },
                  color: "white",
                }}
              >
                {toggleSearch === "searchCategory" ? `${category} news` : "news"}
              </Typography>
            </Box>

            <RenderNews
              isLoading={isLoading}
              newsData={newsData}
              pageSize={pageSize}
              handleLoadMore={handleLoadMore}
            />
          </Grid>
        </Grid>
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
const msp = ({ preference,auth }) => ({
  category: preference.category,
  country: preference.country,
  language: preference.language,
  authToken:auth.authToken
});
const mdp = (dispatch) => ({});

export default connect(msp, mdp)(TopHeadlines);

const sortByArray = [
  { name: "Recent First", value: "publishedAt" },
  { name: "Popular", value: "popularity" },
];
const searchBy = [
  { name: "Search By Category", value: "searchCategory" },
  { name: "Search By Source", value: "searchSource" },
];

// const sourcesData = [
//   {
//     id: 1,
//     name: "BBC NEWS",
//     value: "bbc-news",
//   },
//   {
//     id: 2,
//     name: "ABC NEWS",
//     value: "abc-news",
//   },
// ];
