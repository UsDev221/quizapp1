import {
  USER_NAME,
  COUNT_SCORE,
  SELECT_CATEGORY,
  SELECT_DIFFICULTY,
  SELECT_TYPE,
  SELECT_NUMBER_OF_QUESTIONS,
} from "./actionTypes";

const initialState = {
  username: "",
  question_category: "",
  question_difficulty: "",
  question_type: "",
  number_of_questions: 20,
  score: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME:
      return {
        ...state,
        username: action.payload,
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        question_category: action.payload,
      };
    case SELECT_DIFFICULTY:
      return {
        ...state,
        question_difficulty: action.payload,
      };
    case SELECT_TYPE:
      return {
        ...state,
        question_type: action.payload,
      };
    case SELECT_NUMBER_OF_QUESTIONS:
      return {
        ...state,
        number_of_questions: action.payload,
      };
    case COUNT_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
