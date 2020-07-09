const CREATE_LIST = "CREATE_LIST";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";

let localStorage = JSON.parse(window.localStorage.getItem("dataUserList"));
let initialState = localStorage ? localStorage : [];
const ListReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let stateCopy = [...state];
      stateCopy.push({
        id: action.id,
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

export const createList = (name, id, boardId) => {
  return {
    type: CREATE_LIST,
    name,
    id,
    boardId,
  };
};

export const deleteList = (listId, tasksId) => {
  return { type: DELETE_LIST, listId, tasksId };
};

export default ListReduser;
