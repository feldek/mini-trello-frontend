import { uuid } from "uuidv4";
const CREATE_BOARD = "CREATE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage ? localStorage.boards : [];
const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let newState = [...action.state];
      newState.push({ id: uuid(), name: action.name });
      return newState;
    }
    case DELETE_BOARD: {
      let newState = action.stateBoard.filter(
        (item) => action.boardId !== item.id
      );
      return newState;
    }
    default:
      return state;
  }
};

export const createBoard = (state, name) => {
  return { type: CREATE_BOARD, state, name };
};

export const deleteBoard = (
  stateBoard,
  boardId,
  listsId,
  stateList,
  stateTask
) => {
  return {
    type: DELETE_BOARD,
    stateBoard,
    boardId,
    listsId,
    stateList,
    stateTask,
  };
};

export default BoardReduser;
