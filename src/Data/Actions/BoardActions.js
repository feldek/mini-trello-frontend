import { api } from "../../Api/Api";

export const ON_SET_BOARDS = "ON_SET_BOARDS";
export const ON_CREATE_BOARD = "ON_CREATE_BOARD";
export const ON_DELETE_BOARD = "ON_DELETE_BOARD";
export const ON_SET_VISIBILITY_BOARD = "ON_SET_VISIBILITY_BOARD";
export const ON_CLEAR_DATA = "user/onClearData";
export const ON_SET_IS_FETCHING_BOARDS = "ON_SET_IS_FETCHING_BOARDS";

export const onSetBoards = (data) => {
  return { type: ON_SET_BOARDS, data };
};
export const getBoards = () => async (dispatch) => {
  dispatch(onSetIsFenchingBoards(true));
  let boards = await api.getRequestAuth("boards");
  dispatch(onSetBoards(boards.payload));
  dispatch(onSetIsFenchingBoards(false));
};

export const onCreateBoardStart = ({ id, name }) => {
  return { type: ON_CREATE_BOARD, id, name };
};
export const onCreateBoardError = ({ boardId, listsId }) => {
  return { type: ON_DELETE_BOARD, boardId, listsId };
};
export const createBoard = ({ name, id }) => async (dispatch, getState) => {
  dispatch(onCreateBoardStart({ name, id }));
  let result = await api.postRequestAuth("board", { name, id });
  if (!result.status) {
    let listsId = getState()
      .lists.data.filter((el) => el.boardId === id)
      .map((el) => el.id);
    dispatch(onCreateBoardError({ boardId: id, listsId }));
  }
};

export const onDeleteBoardSuccess = ({ boardId, listsId }) => {
  return { type: ON_DELETE_BOARD, boardId, listsId };
};
export const onDeleteBoardStart = ({ boardId }) => {
  return { type: ON_SET_VISIBILITY_BOARD, boardId, visibility: false };
};
export const onDeleteBoardError = ({ boardId }) => {
  return { type: ON_SET_VISIBILITY_BOARD, boardId, visibility: true };
};
export const deleteBoard = ({ boardId }) => async (dispatch, getState) => {
  dispatch(onDeleteBoardStart({ boardId }));
  let result = await api.deleteRequestAuth("board", { id: boardId });
  if (!result.status) {
    dispatch(onDeleteBoardError({ boardId }));
  } else {
    let listsId = getState()
      .lists.data.filter((el) => el.boardId === boardId)
      .map((el) => el.id);
    onDeleteBoardSuccess({ boardId, listsId });
  }
};

export const onSetIsFenchingBoards = (isFetching) => {
  return { type: ON_SET_IS_FETCHING_BOARDS, isFetching };
};
