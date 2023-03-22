import { SET_ALL_PREFERENCES,SET_PREFERENCES, SET_CATEGORY } from "../actions";

const preState = {
  category: "",
  country: null,
  language: null,
  allCategories:{},
  allCountries:{},
  allLanguages:{},
};

const preferenceReducer = (state = preState, action) => {
  Object.freeze(state);
  const stateDup = { ...state };
  const { type, category, country, language,categories,languages,countries } = action;
  switch (type) {
    case SET_ALL_PREFERENCES:
      return { ...stateDup, categories, countries, languages };
    case SET_PREFERENCES:
      return { ...stateDup, category, country, language };
    case SET_CATEGORY:
      return { ...stateDup, category };

    default:
      return state;
  }
};

export default preferenceReducer;
