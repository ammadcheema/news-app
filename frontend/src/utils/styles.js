export const dropDownTypography = (name, type) => {
  return {
    backgroundColor: type.indexOf(name) === -1 ? "white" : "#eeeeee",
  };
};
