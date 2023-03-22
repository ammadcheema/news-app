import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DropDown from "./DropDown";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Slide } from "@mui/material";
import { connect } from "react-redux";
import { setModalClose, setPreferences } from "../../redux/actions";
import { setAllPreferences, setError, } from "../../redux/actions";
import {axiosPutRequest} from "../../config/request"
// import { response } from "express";
// import { thunkFetchPreferences } from "../../redux/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categoriesData = [
  {
    id: 1,
    name: "Business",
    value: "business",
  },
  {
    id: 2,
    name: "Entertainment",
    value: "entertainment",
  },
  {
    id: 3,
    name: "General",
    value: "general",
  },
  { name: "Health", value: "health" },
  {
    id: 4,
    name: "Science",
    value: "science",
  },
  { id: 5, name: "Sports", value: "sports" },
  {
    id: 6,
    name: "Technology",
    value: "technology",
  },
];

const countriesData = [
  {
    id: 1,
    name: "USA",
    value: "us",
  },
  {
    id: 2,
    name: "UAE",
    value: "ua",
  },
  {
    id: 3,
    name: "Pakistan",
    value: "pk",
  },
];
const languageData = [
  {
    id: 1,
    name: "English",
    value: "en",
  },
  {
    id: 2,
    name: "Afericans",
    value: "af",
  },
  {
    id: 3,
    name: "Arebic",
    value: "ar",
  },
];
const SettingsDialog = ({
  setPreference,
  open,
  country,
  language,
  category,
  setModalClose,
  categories,
  languages,
  countries,
  authToken
}) => {
  const [sources, setSources] = useState([]);
  const [countrySelected, setCountrySelected] = useState(country);
  const [languageSelected, setLanguageSelected] = useState(language);
  const [categorySelected, setCategorySelected] = useState(category);

  const handleSetSources = (value) => {
    setSources(value);
  };
  const handleCloseModal = () => {
    setModalClose();
  };
  const handleSetCountry = (value) => {
    setCountrySelected(value);
  };
  const handleSetLanguage = (value) => {
    setLanguageSelected(value);
  };
  const handleSetCategory = (value) => {
    setCategorySelected(value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(authToken)
    const response = await axiosPutRequest(`/profile?category=${categorySelected}&language=${languageSelected}&country=${countrySelected}`, authToken);
    const userPreferences = {
      category: response.data.data.category,
      country: response.data.data.country,
      language: response.data.data.language,
    };
    console.log(userPreferences);
    setPreference(userPreferences);
    handleCloseModal();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-describedby="Preference"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Prefrences</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "90%" }}>
              <DropDown
                data={countries}
                title={"Country"}
                selected={countrySelected}
                handleSelected={handleSetCountry}
              />
              <DropDown
                data={languages}
                title={"Language"}
                selected={languageSelected}
                handleSelected={handleSetLanguage}
              />
              <DropDown
                data={categories}
                title={"Category"}
                selected={categorySelected}
                handleSelected={handleSetCategory}
              />
            </Box>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            color: "black",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#FEC20C" },
          }}
          onClick={handleCloseModal}
        >
          Close
        </Button>
        <Button
          sx={{
            backgroundColor: "#FEC20C",
            color: "black",
            cursor: "pointer",
            "&:hover": { backgroundColor: "black", color: "white" },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const msp = ({ preference, modal,auth }) => ({
  category: preference.category,
  country: preference.country,
  language: preference.language,
  categories: preference.categories,
  countries: preference.countries,
  languages: preference.languages,
  open: modal.open,
  authToken:auth.authToken
});
const mdp = (dispatch) => ({
  setPreference: (category, country, language) =>
    dispatch(setPreferences(category, country, language)),
  setModalClose: () => dispatch(setModalClose()),
  setError: () =>
    dispatch(setError())
});

export default connect(msp, mdp)(SettingsDialog);
