const CREATE_LIST = "CREATE_LIST";
const DELETE_LIST = "DELETE_LIST";
const DELETE_LISTS_BOARD = "DELETE_LISTS_BOARD";

let localStorage = JSON.parse(window.localStorage.getItem("dataUserList"));
const ListReduser = (state = localStorage, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let stateCopy = !state ? [] : [...state];
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
    case DELETE_LISTS_BOARD: {
      let stateCopy = state.filter(
        (item) => !action.boardId.includes(item.boardId)
      );
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

export const deleteList = (listId) => {
  return { type: DELETE_LIST, listId };
};
export const deleteListsBoard = (boardId) => {
  return { type: DELETE_LISTS_BOARD, boardId };
};

export default ListReduser;
