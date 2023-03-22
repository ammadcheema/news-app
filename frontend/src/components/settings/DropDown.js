import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const DropDown = ({ title, selected, handleSelected,data }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    handleSelected(value);
  };
  
  return (
    <FormControl sx={{ width: "100%", mb: 2, ml: 1 }}>
      <InputLabel id="country-checkbox-label">{title}</InputLabel>
      <Select
        labelId="country-checkbox-label"
        input={<OutlinedInput label={title} />}
        value={selected}
        size="medium"
        onChange={handleChange}
      >
    {data && data.map((list) => (
          <MenuItem
            key={list.key}
            value={list.key}
            sx={{ fontSize: "14px" }}
          >
            {list.value}
          </MenuItem>
        ))}
       
      </Select>
    </FormControl>
  );
};



export default DropDown;
