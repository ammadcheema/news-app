import React from "react";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const SearchBox = ({ handleSearchChange }) => {
  return (
    <TextField
      placeholder="Search News here..."
      size="small"
      sx={{
        mt: 2,
        backgroundColor: "white",
        "& .MuiOutlinedInput-root": {
          paddingRight: 0,
        },
        width: "95%",
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            sx={{
              backgroundColor: "rgb(255, 192, 1)",
              padding: "27.5px 14px",
              borderTopLeftRadius: (theme) => theme.shape.borderRadius + "px",
              borderBottomLeftRadius: (theme) =>
                theme.shape.borderRadius + "px",
            }}
            position="end"
          >
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
