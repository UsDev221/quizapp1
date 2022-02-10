import { Box, FormControl, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleUsername } from "../redux/actions";

export const TextEnter = (props) => {
  const [value, setValue] = useState();
  const { label, type } = props;
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setValue(e.target.value);
    if (label === "Username") {
      dispatch(handleUsername(e.target.value));
    }
  };

  return (
    <Box my={2} mx="auto" width="50%">
      <FormControl size="small" fullWidth>
        <TextField
          onChange={handleOnChange}
          value={value}
          varient="outlined"
          label={label}
          type={type}
          size="small"
        />
      </FormControl>
    </Box>
  );
};
