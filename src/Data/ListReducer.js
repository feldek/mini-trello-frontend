import {  ON_CLEAR_DATA, ON_DELETE_BOARD } from "./Actions/BoardActions";

import {
  ON_CREATE_LIST,
  ON_DELETE_LIST,
  ON_SET_IS_FETCHING_LISTS,
  ON_SET_LISTS,
  ON_SET_VISIBILITY_LIST,
} from "./Actions/ListActions";

const initialState = {
  data: [],
  isFetching: false,
};

const ListReduser = (state = initialState, action) => {
  switch (action.type) {
    case ON_CREATE_LIST: {
      let newData = [...state.data];
      newData.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
        visibility: true,
      });
      return { ...state, data: newData };
    }
    case ON_DELETE_LIST: {
      let newData = state.data.filter((el) => action.listId !== el.id);
      return { ...state, data: newData };
    }
    case ON_SET_LISTS: {
      if (!action.data) return state;
      let newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_SET_IS_FETCHING_LISTS: {
      return { ...state, isFetching: action.isFetching };
    }
    case ON_SET_VISIBILITY_LIST: {
      let newData = state.data.map((el) => {
        if (action.listId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_CLEAR_DATA: {
      let newData = [];
      return { ...state, data: newData };
    }
    case ON_DELETE_BOARD: {
      let newData = state.data.filter((item) => action.boardId !== item.boardId);
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default ListReduser;
