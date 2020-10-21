import { uuid } from "uuidv4";
import { api } from "../../Api/Api";

export const ON_CREATE_LIST = "ON_CREATE_LIST";
export const ON_DELETE_LIST = "ON_DELETE_LIST";
export const ON_DELETE_BOARD = "ON_DELETE_BOARD";
export const ON_SET_LISTS = "ON_SET_LISTS";
export const ON_SET_VISIBILITY_LIST = "ON_SET_VISIBILITY_LIST";
export const ON_SET_IS_FETCHING_LISTS = "ON_SET_IS_FETCHING_LISTS";

export const onSetLists = ({ data }) => {
  return { type: ON_SET_LISTS, data };
};
export const onSetIsFenchingLists = (isFetching) => {
  return { type: ON_SET_IS_FETCHING_LISTS, isFetching };
};
export const getLists = ({ boardId }) => async (dispatch) => {
  dispatch(onSetIsFenchingLists(true));
  let lists = await api.getRequestAuth("lists/getCurrentLists", { boardId });
  dispatch(onSetLists({ data: lists.payload }));
  dispatch(onSetIsFenchingLists(false));
};

export const onCreateListStart = ({ name, boardId, id }) => {
  return { type: ON_CREATE_LIST, name, boardId, id };
};
export const onCreateListError = ({ listId }) => {
  return { type: ON_DELETE_LIST, listId };
};
export const createList = ({ boardId, name }) => async (dispatch) => {
  let id = uuid();
  dispatch(onCreateListStart({ name, id, boardId }));
  let result = await api.postRequestAuth("lists/createList", { boardId, name, id });
  if (!result.status) {
    dispatch(onCreateListError({ listId: id }));
  }
};

export const onDeleteListSuccess = ({ listId }) => {
  return { type: ON_DELETE_LIST, listId };
};
export const onDeleteListStart = ({ listId }) => {
  return { type: ON_SET_VISIBILITY_LIST, listId, visibility: false };
};
export const onDeleteListError = ({ listId }) => {
  return { type: ON_SET_VISIBILITY_LIST, listId, visibility: true };
};
export const deleteList = ({ listId }) => async (dispatch) => {
  dispatch(onDeleteListStart({ listId }));
  const result = await api.deleteRequestAuth("lists/deleteList", { id: listId });
  if (!result.status) {
    dispatch(onDeleteListError({ listId }));
  } else {
    dispatch(onDeleteListSuccess({ listId }));
  }
};
