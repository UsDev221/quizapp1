import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useNavigate } from "react-router-dom";
import Axios from "../APICalls/Axios";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { handleCountScore } from "../redux/actions";
import { decode } from "html-entities";
import Person from "@material-ui/icons/Person";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "Column",
    margin: "100px auto",
    width: "60vw",
    height: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "80%",
      margin: "60px auto",
      padding: "10px 5px",
    },
  },
  questionList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "50vh",
    justifyContent: "space-around",
  },
  qNumber: {
    height: "50px",
    width: "50px",
    backgroundColor: "Green",
    borderRadius: "50%",
    display: "flex",
    margin: "auto",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    backgroundColor: "#696ed1",
    color: "white",
    width: "80%",
    border: "2px solid black",
    textAlign: "center",
    padding: "20px",
    borderRadius: "20px",
  },
  answers: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "50px",
  },
  answer: {
    width: "40%",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#7944ab",
    color: "white",
    border: "1px solid black",
    borderRadius: "10px",
    margin: "10px 10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3240a8",
    },
  },
  answerActive: {
    backgroundColor: "#FFA781",
  },
  button: {
    width: "100px",
    backgroundColor: "#344feb",
    color: "white",
    margin: "20px auto",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#4E5BA8",
    },
  },
  username: {
    backgroundColor: "#42adf5",
    display: "flex",
    width: "60vw",
    margin: "20px auto",
    padding: "10px",
    justifyContent: "flex-end",
    fontSize: "25px",
    fontWeight: "1000",
    color: "white",
  },
  person: {
    margin: "0 10px",
    fontSize: "35px",
    color: "white",
  },
}));

const getRandomNumber = (ansMax) => {
  return Math.floor(Math.random() * Math.floor(ansMax));
};

export default function Card() {
  const {
    username,
    question_category,
    question_difficulty,
    question_type,
    number_of_questions,
    score,
  } = useSelector((state) => state);
  const [activeState, changeActiveState] = useState({
    activeAnswer: null,
    objects: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
  });
  console.log("number of questions " + number_of_questions);
  const classes = useStyles();
  const [questionNmber, setQuestionNumber] = useState(0);
  const [ansOptions, setAnsOptions] = useState([]);
  const [clickedAns, setClickedAns] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let apiUrl = `/api.php?amount=${number_of_questions}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = Axios({ url: apiUrl });

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionNmber];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomNumber(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setAnsOptions(answers);
    }
  }, [response, questionNmber]);

  if (loading) {
    <Box mt={15}>
      <CircularProgress />
    </Box>;
  }

  function nextQuestion() {
    const question = response.results[questionNmber];
    changeActiveState({
      ...activeState,
      activeAnswer: -1,
    });

    if (clickedAns === question.correct_answer) {
      dispatch(handleCountScore(score + 1));
    }
    if (questionNmber + 1 < response.results.length) {
      setQuestionNumber((prev) => prev + 1);
    } else {
      navigate("/results");
    }
  }

  const handleClick = (a, id) => {
    setClickedAns(a);
    changeActiveState({
      ...activeState,
      activeAnswer: activeState.objects[id],
    });
  };

  const changeActiveInactive = (id) => {
    if (activeState.objects[id] === activeState.activeAnswer) {
      return classNames(classes.answer, classes.answerActive);
    } else {
      return classNames(classes.answer);
    }
  };

  return (
    <div>
      <div className={classes.username}>
        Hi, {username}
        <Person className={classes.person} />
      </div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper elevation={3} className={classes.paperStyle}>
            <div className={classes.questionList}>
              <div className={classes.qNumber}>{questionNmber + 1}</div>
              <div className={classes.question}>
                {decode(response?.results[questionNmber].question)}
              </div>
              <div className={classes.answers}>
                {ansOptions.map((a, id) => (
                  <div
                    key={id}
                    className={changeActiveInactive(id)}
                    onClick={() => handleClick(a, id)}
                  >
                    {decode(a)}
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              endIcon={<NavigateNextIcon />}
              onClick={nextQuestion}
            >
              Next
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
