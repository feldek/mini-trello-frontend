import { ON_CLEARED_DATA, ON_DELETED_BOARD } from "./Actions/BoardActions";
import {
  ON_CREATED_LIST,
  ON_DELETED_LIST,
  ON_SETTED_IS_FETCHING_LISTS,
  ON_SETTED_LISTS,
  ON_SETTED_VISIBILITY_LIST,
} from "./Actions/ListActions";

const initialState = {
  data: [],
  isFetching: false,
};

const ListReduser = (state = initialState, action) => {
  switch (action.type) {
    case ON_CREATED_LIST: {
      let newData = [...state.data];
      newData.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
        visibility: true,
      });
      return { ...state, data: newData };
    }
    case ON_DELETED_LIST: {
      let newData = state.data.filter((el) => action.listId !== el.id);
      return { ...state, data: newData };
    }
    case ON_SETTED_LISTS: {
      if (!action.data) return state;
      let newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_SETTED_IS_FETCHING_LISTS: {
      return { ...state, isFetching: action.isFetching };
    }
    case ON_SETTED_VISIBILITY_LIST: {
      let newData = state.data.map((el) => {
        if (action.listId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_CLEARED_DATA: {
      let newData = [];
      return { ...state, data: newData };
    }
    case ON_DELETED_BOARD: {
      let newData = state.data.filter((item) => action.boardId !== item.boardId);
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default ListReduser;
