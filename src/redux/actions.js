import {
  USER_NAME,
  SELECT_CATEGORY,
  SELECT_DIFFICULTY,
  SELECT_TYPE,
  SELECT_NUMBER_OF_QUESTIONS,
  COUNT_SCORE,
} from "./actionTypes";

export const handleCategorySelect = (payload) => ({
  type: SELECT_CATEGORY,
  payload,
});

export const handleDifficultySelect = (payload) => ({
  type: SELECT_DIFFICULTY,
  payload,
});

export const handleTypeSelect = (payload) => ({
  type: SELECT_TYPE,
  payload,
});

export const handleNumberOfQuestions = (payload) => ({
  type: SELECT_NUMBER_OF_QUESTIONS,
  payload,
});

export const handleCountScore = (payload) => ({
  type: COUNT_SCORE,
  payload,
});

export const handleUsername = (payload) => ({
  type: USER_NAME,
  payload,
});
