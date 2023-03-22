import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNews from "../../components/home/TopNews";
import SettingsDialog from "../../components/settings/Settings";
import { Stack, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { setAllPreferences, setError, thunkFetchPreferences } from "../../redux/actions";
import { connect } from "react-redux";
import {axiosGetRequest} from "../../config/request"

const Home = ({authToken,setAllPreferences,setError,country,category}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [topNews, setTopNews] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if(authToken !== null){
        const response = await axiosGetRequest('/news/preferences', authToken)
      if(response.data.status==="success"){
        const {categories,countries,languages} = response.data.data
        setAllPreferences({categories,countries,languages})
      }else if(response.data.status==="error"){
        setError(response.data.errors)
      }
      }
      const getData = await axiosGetRequest(`/news/topHeadlines?country=${country}&category=${category}&keyword=&pageSize=20&page=0`, authToken)
        setTopNews(getData.data.data.news);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
             <TopNews
              topNews={topNews}
              about={process.env.REACT_APP_TOP_NEWS_COUNTRY}
            />
          </>
        )}
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

const msp = ({auth,preference}) => ({
  authToken:auth.authToken,
  country: preference.country,
  category:preference.category
});
const mdp = (dispatch) => ({
  setAllPreferences:({categories,countries,languages})=>
    dispatch(setAllPreferences({categories,countries,languages})),
  setError: () =>
    dispatch(setError())
 
});

export default connect(msp, mdp)(Home);
