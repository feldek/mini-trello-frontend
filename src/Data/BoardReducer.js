import { api } from "../Api/Api";
const CREATED_BOARD = "CREATED_BOARD";
const DELETE_BOARD = "DELETE_BOARD";
const SET_BOARDS = "SET_BOARDS";
const CLEAR_DATA = "CLEAR_DATA";
// let api={}

// let initialState = [];
const BoardReduser = (state = [], action) => {
  switch (action.type) {
    case CREATED_BOARD: {
      let newState = [...state];
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
      let newState = [...state];
      newState = newState.filter((item) => action.boardId !== item.id);
      return newState;
    }
    default:
      return state;
  }
};

export const createdBoard = ({ id, name }) => {
  return { type: CREATED_BOARD, id, name };
};
export const settedBoards = (state) => {
  return { type: SET_BOARDS, state };
};

export const deletedBoard = ({ boardId, listsId }) => {
  return { type: DELETE_BOARD, boardId, listsId };
};

export const getBoards = () => (dispatch) => {
  return api.getRequest("boards/getBoards").then(
    (result) => {
      dispatch(settedBoards(result.payload));
    },
    (error) => {
      console.log(error);
    }
  );
};
export const createBoard = ({ name, id, listsId }) => async (dispatch) => {
  dispatch(createdBoard({ name, id }));
  let result = await api.postRequest("boards/createBoard", { name, id });
  if (!result.status) dispatch(deletedBoard({ boardId: id, listsId }));
};
export const deleteBoard = (state, { boardId, stateList, stateTask }) => (dispatch) => {
  return api.deleteRequest("boards/deleteBoard", { id: boardId });
  // .then(async (result) => {
  //     if (result.deletedBoard === true) {
  //       await dispatch(
  //         deleteBoardLocal(state, { boardId,  stateList, stateTask })
  //       );
  //     }
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
};

export default BoardReduser;
