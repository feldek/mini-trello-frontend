import { uuid } from "uuidv4";
import { api } from "../Api/Api";
const CREATE_LIST = "CREATE_LIST";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";
const SET_LISTS = "SET_LISTS";
const CLEAR_DATA = "CLEAR_DATA";
const SET_VISIBILITY_LIST = "SET_VISIBILITY_LIST";
const SET_IS_FETCHING_LISTS = "SET_IS_FETCHING_LISTS";

const initState = {
  data: [],
  isFetching: false,
};

const ListReduser = (state = initState, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let newData = [...state.data];
      newData.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
        visibility: true,
      });
      return { ...state, data: newData };
    }
    case DELETE_LIST: {
      let newData = state.data.filter((el) => action.listId !== el.id);
      return { ...state, data: newData };
    }
    case SET_LISTS: {
      if (!action.data) return state;
      let newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case SET_IS_FETCHING_LISTS: {
      return { ...state, isFetching: action.isFetching };
    }
    case SET_VISIBILITY_LIST: {
      let newData = state.data.map((el) => {
        if (action.listId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return { ...state, data: newData };
    }
    case CLEAR_DATA: {
      let newData = [];
      return { ...state, data: newData };
    }
    case DELETE_BOARD: {
      let newData = state.data.filter((item) => action.boardId !== item.boardId);
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export const onCreatedList = ({ name, boardId, id }) => {
  return {
    type: CREATE_LIST,
    name,
    boardId,
    id,
  };
};

export const onDeletedList = ({ listId }) => {
  return { type: DELETE_LIST, listId };
};

export const onSetLists = ({ data }) => {
  return { type: SET_LISTS, data };
};

export const onSettedVisibilityList = ({ listId, visibility }) => {
  return { type: SET_VISIBILITY_LIST, listId, visibility };
};

export const settedIsFenchingLists = (isFetching) => {
  return { type: SET_IS_FETCHING_LISTS, isFetching };
};

export const getLists = ({ boardId }) => async (dispatch) => {
  dispatch(settedIsFenchingLists(true));
  let lists = await api.getRequestAuth("lists/getCurrentLists", { boardId });
  dispatch(settedIsFenchingLists(false));
  dispatch(onSetLists({ data: lists.payload }));
};

export const createList = ({ boardId, name }) => async (dispatch) => {
  let id = uuid();
  dispatch(onCreatedList({ name, id, boardId }));
  let result = await api.postRequestAuth("lists/createList", { boardId, name, id });
  if (!result.status) {
    dispatch(onDeletedList({ listId: id }));
  }
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

export default ListReduser;
