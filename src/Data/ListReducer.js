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
      let newState = [...action.state];
      newState.push({
        id: id,
        name: action.name,
        boardId: action.boardId,
      });
      return newState;
    }
    case DELETE_LIST: {
      let newState = action.stateList.filter((el) => action.listId !== el.id);
      return newState;
    }

    case DELETE_BOARD: {
      let newState = action.stateList.filter((item) => action.boardId !== item.boardId);
      return newState;
    }
    default:
      return state;
  }
};

export const createList = (state, name, boardId) => {
  return {
    type: CREATE_LIST,
    state,
    name,
    boardId,
  };
};

export const deleteList = (stateList, listId, stateTask) => {
  return { type: DELETE_LIST, stateList, listId, stateTask };
};

export default ListReduser;
