import { api } from "../../Api/Api";

export const ON_SETTED_BOARDS = "SET_BOARDS";
export const ON_CREATED_BOARD = "CREATE_BOARD";
export const ON_DELETED_BOARD = "DELETE_BOARD";
export const ON_SETTED_VISIBILITY_BOARD = "SET_VISIBILITY_BOARD";
export const ON_CLEARED_DATA = "CLEAR_DATA";
export const ON_SETTED_IS_FETCHING_BOARDS = "SET_IS_FETCHING_BOARDS";

export const onSettedBoards = (data) => {
  return { type: ON_SETTED_BOARDS, data };
};
export const getBoards = () => async (dispatch) => {
  let boards = await api.getRequestAuth("boards/getBoards");
  dispatch(onSettedBoards(boards.payload));
};

export const onCreatedBoard = ({ id, name }) => {
  return { type: ON_CREATED_BOARD, id, name };
};
export const createBoard = ({ name, id }) => async (dispatch, getState) => {
  dispatch(onCreatedBoard({ name, id }));
  let result = await api.postRequestAuth("boards/createBoard", { name, id });
  if (!result.status) {
    let listsId = getState()
      .lists.data.filter((el) => el.boardId === id)
      .map((el) => el.id);
    dispatch(onDeletedBoard({ boardId: id, listsId }));
  }
};

export const onDeletedBoard = ({ boardId, listsId }) => {
  return { type: ON_DELETED_BOARD, boardId, listsId };
};
export const onSettedVisibilityBoard = ({ boardId, visibility }) => {
  return { type: ON_SETTED_VISIBILITY_BOARD, boardId, visibility };
};
export const deleteBoard = ({ boardId }) => async (dispatch, getState) => {
  dispatch(onSettedVisibilityBoard({ boardId, visibility: false }));
  let result = await api.deleteRequestAuth("boards/deleteBoard", { id: boardId });
  if (!result.status) {
    dispatch(onSettedVisibilityBoard({ boardId, visibility: true }));
  } else {
    let listsId = getState()
      .lists.data.filter((el) => el.boardId === boardId)
      .map((el) => el.id);
    onDeletedBoard({ boardId, listsId });
  }
};

export const settedIsFenchingBoards = (isFetching) => {
  return { type: ON_SETTED_IS_FETCHING_BOARDS, isFetching };
};
