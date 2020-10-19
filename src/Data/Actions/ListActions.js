import { uuid } from "uuidv4";
import { api } from "../../Api/Api";

export const ON_CREATED_LIST = "CREATE_LIST";
export const ON_DELETED_LIST = "DELETE_LIST";
export const ON_DELETED_BOARD = "DELETE_BOARD";
export const ON_SETTED_LISTS = "SET_LISTS";
export const ON_CLEARED_DATA = "CLEAR_DATA";
export const ON_SETTED_VISIBILITY_LIST = "SET_VISIBILITY_LIST";
export const ON_SETTED_IS_FETCHING_LISTS = "SET_IS_FETCHING_LISTS";

export const onSettedLists = ({ data }) => {
  return { type: ON_SETTED_LISTS, data };
};
export const settedIsFenchingLists = (isFetching) => {
  return { type: ON_SETTED_IS_FETCHING_LISTS, isFetching };
};
export const getLists = ({ boardId }) => async (dispatch) => {
  dispatch(settedIsFenchingLists(true));
  let lists = await api.getRequestAuth("lists/getCurrentLists", { boardId });
  dispatch(onSettedLists({ data: lists.payload }));
  dispatch(settedIsFenchingLists(false));
};

export const onCreatedList = ({ name, boardId, id }) => {
  return { type: ON_CREATED_LIST, name, boardId, id };
};
export const createList = ({ boardId, name }) => async (dispatch) => {
  let id = uuid();
  dispatch(onCreatedList({ name, id, boardId }));
  let result = await api.postRequestAuth("lists/createList", { boardId, name, id });
  if (!result.status) {
    dispatch(onDeletedList({ listId: id }));
  }
};

export const onDeletedList = ({ listId }) => {
  return { type: ON_DELETED_LIST, listId };
};
export const onSettedVisibilityList = ({ listId, visibility }) => {
  return { type: ON_SETTED_VISIBILITY_LIST, listId, visibility };
};
export const deleteList = ({ listId }) => async (dispatch) => {
  dispatch(onSettedVisibilityList({ listId, visibility: false }));
  const result = await api.deleteRequestAuth("lists/deleteList", { id: listId });
  if (!result.status) {
    dispatch(onSettedVisibilityList({ listId, visibility: true }));
  } else {
    dispatch(onDeletedList({ listId }));
  }
};
