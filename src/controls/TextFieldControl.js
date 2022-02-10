import { FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { handleNumberOfQuestions } from "../redux/actions";

export const TextFieldControl = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(handleNumberOfQuestions(e.target.value));
  };

  return (
    <Box my={4} mx="auto" width="50%">
      <FormControl size="small" fullWidth>
        <TextField
          onChange={handleChange}
          value={value}
          variant="outlined"
          label="Number Of Questions"
          type="number"
          size="small"
        />
      </FormControl>
    </Box>
  );
};
