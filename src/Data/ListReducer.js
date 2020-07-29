import { uuid } from "uuidv4";
const CREATE_LIST = "CREATE_LIST";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage ? localStorage.lists : [];
const ListReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let id = uuid();
      let stateCopy = [...state];
      stateCopy.push({
        id: id,
        name: action.name,
        boardId: action.boardId,
      });
      return stateCopy;
    }
    case DELETE_LIST: {
      let stateCopy = state.filter((el) => action.listId !== el.id);
      return stateCopy;
    }

    case DELETE_BOARD: {
      let stateCopy = state.filter((item) => action.boardId !== item.boardId);
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createList = (name, boardId) => {
  return {
    type: CREATE_LIST,
    name,
    boardId,
  };
};

export const deleteList = (listId) => {
  return { type: DELETE_LIST, listId };
};

export default ListReduser;
