import { uuid } from "uuidv4";
import { api } from "../Api/Api";
const CREATE_LIST = "CREATE_LIST";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";
const SET_LISTS = "SET_LISTS";
const CLEAR_DATA = "CLEAR_DATA";
const SET_VISIBILITY_LIST = "SET_VISIBILITY_LIST";

const ListReduser = (state = [], action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let newState = [...state];
      newState.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
        visibility: true,
      });
      return newState;
    }
    case DELETE_LIST: {
      let newState = state.filter((el) => action.listId !== el.id);
      return newState;
    }
    case SET_LISTS: {
      if (!action.state) return state;
      let newState = action.state.map((el) => {
        el.visibility = true;
        return el;
      });
      return newState;
    }
    // case ON_SET_LISTS: {
    //   let newState = [];
    //   if (action.response.length > 0) {
    //     newState = [...action.response];
    //     action.state = action.state.filter(
    //       (el) => el.boardId !== action.response[0].boardId
    //     );
    //   }
    //   newState = newState.concat(action.state);
    //   return newState;
    // }
    case SET_VISIBILITY_LIST: {
      let newState = state.map((el) => {
        if (action.listId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return newState;
    }
    case CLEAR_DATA: {
      let newState = [];
      return newState;
    }
    case DELETE_BOARD: {
      let newState = state.filter((item) => action.boardId !== item.boardId);
      return newState;
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

export const onSetLists = ({ state }) => {
  return { type: SET_LISTS, state };
};

export const onSettedVisibilityList = ({ listId, visibility }) => {
  return { type: SET_VISIBILITY_LIST, listId, visibility };
};

export const getLists = ({ boardId }) => async (dispatch) => {
  let lists = await api.getRequestAuth("lists/getCurrentLists", { boardId });
  dispatch(onSetLists({ state: lists.payload }));
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
