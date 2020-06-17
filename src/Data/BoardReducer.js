const CREATE_BOARD = "CREATE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";

let localBoard = JSON.parse(window.localStorage.getItem("dataUserBoard"));
let initialState = localBoard ? localBoard : [];
const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let stateCopy = [...state];
      stateCopy.push({ id: action.id, name: action.name });
      return stateCopy;
    }
    case DELETE_BOARD: {
      let stateCopy = state.filter((item) => !action.boardId.includes(item.id));
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createBoard = (name, id) => {
  return { type: CREATE_BOARD, name, id };
};

export const deleteBoard = (boardId) => {
  return { type: DELETE_BOARD, boardId };
};

export default BoardReduser;
