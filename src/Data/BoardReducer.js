import { api } from "../Api/Api";
const CREATE_BOARD = "CREATE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";
const SET_BOARDS = "SET_BOARDS";
const CLEAR_DATA = "CLEAR_DATA";
// let api={}

// let initialState = [];
const BoardReduser = (state = [], action) => {
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
      let newState = [...action.state];
      newState = newState.filter((item) => action.boardId !== item.id);
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
};

export const createBoardLocal = (state, { id, name }) => {
  return { type: CREATE_BOARD, state, id, name };
};
export const setBoardsLocal = (state) => {
  return { type: SET_BOARDS, state };
};

export const deleteBoardLocal = (state, { boardId, listsId, stateList, stateTask }) => {
  return {
    type: DELETE_BOARD,
    state,
    boardId,
    listsId,
    stateList,
    stateTask,
  };
};

export const getBoards = () => (dispatch) => {
  return api.getRequest("boards/getBoards").then(
    (result) => {
      dispatch(setBoardsLocal(result));
    },
    (error) => {
      console.log(error);
    }
  );
};
export const createBoard = (state, { name }) => (dispatch) => {
  return api.postRequest("boards/createBoard", { name }).then(
    async (result) => {
      if (result.createdBoard === true) {
        await dispatch(createBoardLocal(state, { name, id: result.id }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};
export const deleteBoard = (state, { boardId, listsId, stateList, stateTask }) => (
  dispatch
) => {
  return api.deleteRequest("boards/deleteBoard", { id: boardId }).then(
    async (result) => {
      if (result.deletedBoard === true) {
        await dispatch(
          deleteBoardLocal(state, { boardId, listsId, stateList, stateTask })
        );
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export default BoardReduser;
