import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { dropDownTypography } from "../../utils/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DropDownCheckbox = ({ title, data, value, handleSet }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((cat) => cat.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });
    handleSet(duplicateRemoved);
  };
  return (
    <FormControl size="small" sx={{ width: "90%", bgcolor: "white" }}>
      <InputLabel id="multiple-checkbox-label">{title}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={title} />}
        renderValue={(selected) => selected.map((x) => x.name).join(", ")}
        MenuProps={MenuProps}
      >
        {data.map((current) => (
          <MenuItem
            key={current.id}
            value={current}
            style={dropDownTypography(current, value)}
          >
            <Checkbox
              checked={value.findIndex((item) => item.id === current.id) >= 0}
            />
            <ListItemText primary={current.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownCheckbox;
