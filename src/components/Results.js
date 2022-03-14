import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { handleCountScore } from "../redux/actions";
import SpeedIcon from "@material-ui/icons/Speed";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    display: "flex",
    flexWrap: "wrap",
    margin: "70px auto",
    width: "60vw",
    height: "90%",
    padding: "20px",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
      margin: "40px 10px",
      maxWidth: "100%",
    },
  },
  text: {
    fontSize: "30px",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px auto",
  },
  score: {
    fontSize: "40px",
    margin: "30px auto",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreDetails: {
    border: "10px solid green",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
    width: "100%",
  },
  correct: {
    fontSize: 100,
    color: "green",
  },
  message: {
    fontSize: "15px",
    margin: "auto",
    animationName: "$zoomIn",
    animationDuration: "4s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    [theme.breakpoints.down("sm")]: {
      animationName: "$zoomInSm",
    },
  },
  "@keyframes zoomIn": {
    "0%": {
      fontSize: "15px",
      color: "#cf946d",
    },
    "25%": {
      fontSize: "17px",
      color: "#c98253",
    },
    "50%": {
      fontSize: "19px",
      color: "#c47039",
    },
    "100%": {
      fontSize: "21px",
      color: "#c25108",
    },
  },
  "@keyframes zoomInSm": {
    "0%": {
      fontSize: "10px",
      color: "#cf946d",
    },
    "25%": {
      fontSize: "11px",
      color: "#c98253",
    },
    "50%": {
      fontSize: "12px",
      color: "#c47039",
    },
    "100%": {
      fontSize: "13px",
      color: "#c25108",
    },
  },
  startBtn: {
    backgroundColor: "#344feb",
    color: "white",
    margin: "15px auto",
    "&:hover": {
      backgroundColor: "#4E5BA8",
    },
    width: "20%",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
}));

export default function Results() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, number_of_questions, score } = useSelector(
    (state) => state
  );

  const handleStartAgain = () => {
    dispatch(handleCountScore(0));
    navigate("/");
  };

  const showFeedback = () => {
    if (score === number_of_questions) {
      return <h2>Excellant</h2>;
    } else if (score > number_of_questions * (75 / 100)) {
      return <h2>Good</h2>;
    } else if (score > number_of_questions * (50 / 100)) {
      return <h2>Keep Practising</h2>;
    } else {
      return <h2>Need more Work</h2>;
    }
  };

  return (
    <Grid container styles={{ backgroundColor: "red" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Paper elevation={3} className={classes.paperStyle}>
          <div className={classes.scoreDetails}>
            <div className={classes.text}>{username}'s Score is</div>
            <div className={classes.score}>
              {score}/{number_of_questions}
            </div>
            <CheckCircleIcon className={classes.correct} />
            <SpeedIcon className={classes.correct} />
            <div>
              <Button
                className={classes.startBtn}
                varient="contained"
                onClick={handleStartAgain}
              >
                Start again
              </Button>
            </div>
          </div>
          <div className={classes.message}>{showFeedback()}</div>
        </Paper>
      </Grid>
    </Grid>
  );
}
