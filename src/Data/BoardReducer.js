import { uuid } from "uuidv4";
const CREATE_BOARD = "CREATE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage ? localStorage.boards : [];
const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let stateCopy = [...state];
      stateCopy.push({ id: uuid(), name: action.name });
      return stateCopy;
    }
    case DELETE_BOARD: {
      let stateCopy = state.filter((item) => action.boardId !== item.id);
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createBoard = (name) => {
  return { type: CREATE_BOARD, name };
};

export const deleteBoard = (boardId, listsId) => {
  return { type: DELETE_BOARD, boardId, listsId };
};

export default BoardReduser;
