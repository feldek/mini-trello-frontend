import { uuid } from "uuidv4";

const CREATE_EMPTY_CASE = "CREATE_EMPTY_CASE";
const SET_CASE_STATE = "SET_CASE_STATE";
const DELETE_CASE_LIST = "DELETE_CASE_LIST";
const DELETE_CASE_BOARD = "DELETE_CASE_BOARD";

const CaseReducer = (
  state = JSON.parse(window.localStorage.getItem("dataUserCase")),
  action
) => {
  switch (action.type) {
    case CREATE_EMPTY_CASE: {
      let stateCopy = !state ? [] : [...state];
      stateCopy.push([{ id: uuid(), name: "", listId: action.listId }]);
      return stateCopy;
    }
    case SET_CASE_STATE: {
      return [...action.stateArr];
    }
    case DELETE_CASE_LIST: {
      let stateCopy = [...state];
      stateCopy.splice(action.ind, 1);
      return stateCopy;
    }
    case DELETE_CASE_BOARD: {
      let stateCopy = state.filter(
        (item) => !action.listId.includes(item[0].listId)
      );
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createEmptyCase = (listId) => {
  return { type: CREATE_EMPTY_CASE, listId };
};
export const setCaseState = (stateArr) => {
  return { type: SET_CASE_STATE, stateArr };
};
export const deleteCaseList = (ind) => {
  return { type: DELETE_CASE_LIST, ind };
};
export const deleteCaseBoard = (listId) => {
  return { type: DELETE_CASE_LIST, listId };
};

export default CaseReducer;
