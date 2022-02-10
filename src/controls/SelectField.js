import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleCategorySelect,
  handleDifficultySelect,
  handleTypeSelect,
} from "../redux/actions";

export const SelectField = (props) => {
  const { label, options } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  console.log(options);

  const handleChange = (e) => {
    setValue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategorySelect(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultySelect(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeSelect(e.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <Box my={4} mx="auto" width="50%">
      <FormControl variant="outlined" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select labelId={label} value={value} onChange={handleChange}>
          {options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
