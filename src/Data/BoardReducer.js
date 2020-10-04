import { api } from "../Api/Api";
const CREATE_BOARD = "CREATE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";
const SET_BOARDS = "SET_BOARDS";
const CLEAR_DATA = "CLEAR_DATA";

let initialState = [];
const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let newState = [...action.state];
      newState.push({ id: action.id, name: action.name });
      return newState;
    }
    case SET_BOARDS: {
      let newState = [...action.state];
      return newState;
    }
    case CLEAR_DATA: {
      let newState = [...action.state];
      return newState;
    }
    case DELETE_BOARD: {
      let newState = action.state.filter((item) => action.boardId !== item.id);
      return newState;
    }
    default:
      return state;
  }
};

export const createBoard = (state, { id, name }) => {
  return { type: CREATE_BOARD, state, id, name };
};
export const setBoards = (state) => {
  return { type: SET_BOARDS, state };
};

export const deleteBoard = (state, { boardId, listsId, stateList, stateTask }) => {
  return {
    type: DELETE_BOARD,
    state,
    boardId,
    listsId,
    stateList,
    stateTask,
  };
};

export const reqGetBoards = ({ email }) => (dispatch) => {
  return api.getRequest("boards/getBoards", { email }).then(
    (result) => {
      dispatch(setBoards(result));
    },
    (error) => {
      console.log(error);
    }
  );
};
export const reqCreateBoard = (state, { email, name }) => (dispatch) => {
  return api.postRequest("boards/createBoard", { email, name }).then(
    async (result) => {
      if (result.createdBoard === true) {
        await dispatch(createBoard(state, { name, id: result.id }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};
export const reqDeleteBoard = (state, { boardId, listsId, stateList, stateTask }) => (
  dispatch
) => {
  return api.deleteRequest("boards/deleteBoard", { id: boardId }).then(
    async (result) => {
      if (result.deletedBoard === true) {
        await dispatch(deleteBoard(state, { boardId, listsId, stateList, stateTask }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export default BoardReduser;
