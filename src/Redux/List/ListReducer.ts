import { boardConsts } from "../Board/BoardTypes";
import { ON_CLEAR_DATA } from "../User/UserConstants";
import { InitialListType, ListActionsType, listConsts } from "./ListTypes";

const initialState: InitialListType = {
  data: [],
  isFetching: false,
};

const ListReduser = (state = initialState, action: ListActionsType): InitialListType => {
  switch (action.type) {
    case listConsts.ON_CREATE_LIST: {
      const newData = [...state.data];
      newData.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
        visibility: true,
      });
      return { ...state, data: newData };
    }
    case listConsts.ON_CREATE_LISTS: {
      const newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: [...state.data, ...newData] };
    }
    case listConsts.ON_DELETE_LIST: {
      const newData = state.data.filter((el) => action.listId !== el.id);
      return { ...state, data: newData };
    }
    case listConsts.ON_SET_LISTS: {
      if (!action.data) return state;
      const newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case listConsts.ON_SET_IS_FETCHING_LISTS: {
      return { ...state, isFetching: action.isFetching };
    }
    case listConsts.ON_SET_VISIBILITY_LIST: {
      const newData = state.data.map((el) => {
        if (action.listId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_CLEAR_DATA: {
      return { ...state, data: action.payload };
    }
    case boardConsts.ON_DELETE_BOARD: {
      const newData = state.data.filter((item) => action.payload.boardId !== item.boardId);
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default ListReduser;
