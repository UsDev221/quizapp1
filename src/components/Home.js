import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { TextFieldControl } from "../controls/TextFieldControl";
import { SelectField } from "../controls/SelectField";
import Axios from "../APICalls/Axios";
import Box from "@material-ui/core/Box";
import { TextEnter } from "../controls/TextEnter";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  loginForm: {
    width: "60%",
    margin: "15px auto",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  paperStyle: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "60vw",
    height: "75vh",
    margin: "100px auto",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      margin: "10px auto",
    },
  },
  topic: {
    margin: "40px auto 0px auto",
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#344feb",
    color: "white",
    "&:hover": {
      backgroundColor: "#4E5BA8",
    },
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { response, error, loading } = Axios({ url: "/api_category.php" });
  const difficultySettings = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeSettings = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  console.log(response);
  if (loading) {
    return (
      <Box mt={15}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Error
      </Typography>
    );
  }

  return (
    <form noValidate autoComplete="off">
      <Paper className={classes.paperStyle}>
        <div className={classes.topic}>
          <h2>Measure your knowledge</h2>
        </div>
        <div className={classes.loginForm}>
          <TextEnter label="Username" type="text" />
          <SelectField options={response.trivia_categories} label="Category" />
          <SelectField options={difficultySettings} label="Difficulty" />
          <SelectField options={typeSettings} label="Type" />
          <TextFieldControl />
          <Button
            className={classes.btnStyle}
            variant="contained"
            onClick={handleClick}
          >
            Start Quizz
          </Button>
        </div>
      </Paper>
    </form>
  );
}
