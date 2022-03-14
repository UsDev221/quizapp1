import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleCategorySelect,
  handleDifficultySelect,
  handleTypeSelect,
} from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  selectCtrl: {
    width: "50%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const SelectField = (props) => {
  const classes = useStyles();
  const { label, options } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

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
    <Box my={4} mx="auto" className="selectCtrl">
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
