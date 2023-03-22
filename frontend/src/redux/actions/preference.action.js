export const SET_PREFERENCES = "SET_PREFERENCES";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_ALL_PREFERENCES = "SET_ALL_PREFERENCES"

export const setPreferences = ({ category, country, language }) => ({
  type: SET_PREFERENCES,
  category,
  country,
  language,
});
export const setCategory = ({ category, from }) => ({
  type: SET_CATEGORY,
  category,
});

export const setAllPreferences =({categories,languages,countries})=>({
  type:SET_ALL_PREFERENCES,
  categories,
  countries,
  languages,
})

