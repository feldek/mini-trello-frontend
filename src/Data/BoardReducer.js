import { api } from "../Api/Api";
const CREATE_BOARD = "CREATE_BOARD";
const DELETE_BOARD = "DELETE_BOARD";
const SET_BOARDS = "SET_BOARDS";
const SET_VISIBILITY_BOARD = "SET_VISIBILITY_BOARD";
const CLEAR_DATA = "CLEAR_DATA";

const BoardReduser = (state = [], action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let newState = [...state];
      newState.push({ id: action.id, name: action.name, visibility: true });
      return newState;
    }
    case SET_BOARDS: {
      if (!action.state) {
        return state;
      }
      let newState = action.state.map((el) => {
        el.visibility = true;
        return el;
      });
      return newState;
    }
    case CLEAR_DATA: {
      let newState = [];
      return newState;
    }
    case DELETE_BOARD: {
      let newState = [...state];
      newState = newState.filter((el) => action.boardId !== el.id);
      return newState;
    }
    case SET_VISIBILITY_BOARD: {
      let newState = state.map((el) => {
        if (action.boardId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return newState;
    }
    default:
      return state;
  }
};

export const onCreatedBoard = ({ id, name }) => {
  return { type: CREATE_BOARD, id, name };
};
export const onSettedBoards = (state) => {
  return { type: SET_BOARDS, state };
};

export const onDeletedBoard = ({ boardId, listsId }) => {
  return { type: DELETE_BOARD, boardId, listsId };
};
export const onSettedVisibilityBoard = ({ boardId, visibility }) => {
  return { type: SET_VISIBILITY_BOARD, boardId, visibility };
};

export const getBoards = () => async (dispatch) => {
  let boards = await api.getRequestAuth("boards/getBoards");
  dispatch(onSettedBoards(boards.payload));
};

export const createBoard = ({ name, id }) => async (dispatch, getState) => {
  dispatch(onCreatedBoard({ name, id }));
  let result = await api.postRequestAuth("boards/createBoard", { name, id });
  if (!result.status) {
    let listsId = getState()
      .lists.filter((el) => el.boardId === id)
      .map((el) => el.id);
    dispatch(onDeletedBoard({ boardId: id, listsId }));
  }
};
// const deletePreparing = () => {};
// const deleteSucsess = () => {};
// const deleteError = () => {};

// export const deleteBoard1 = ({ boardId }) => async (dispatch, getState) => {
//   dispatch(deletePreparing({ boardId }));
//   let result = await api.deleteRequestAuth("boards/deleteBoard", { id: boardId });
//   if (result.status) {
//     let listsId = getState()
//     .lists.filter((el) => el.boardId === boardId)
//     .map((el) => el.id);
//     dispatch(deleteSucsess({ boardId , listsId}));
//   } else {
//     dispatch(deleteError({ boardId }));
//   }
// };

export const deleteBoard = ({ boardId }) => async (dispatch, getState) => {
  dispatch(onSettedVisibilityBoard({ boardId, visibility: false }));
  let result = await api.deleteRequestAuth("boards/deleteBoard", { id: boardId });
  if (!result.status) {
    dispatch(onSettedVisibilityBoard({ boardId, visibility: true }));
  } else {
    let listsId = getState()
      .lists.filter((el) => el.boardId === boardId)
      .map((el) => el.id);
    onDeletedBoard({ boardId, listsId });
  }
};

export default BoardReduser;
