import {
  ON_CLEAR_DATA,
  ON_CREATE_BOARD,
  ON_DELETE_BOARD,
  ON_SET_BOARDS,
  ON_SET_IS_FETCHING_BOARDS,
  ON_SET_VISIBILITY_BOARD,
} from "./Actions/BoardActions";

const initState = {
  data: [],
  isFetching: false,
};

const BoardReduser = (state = initState, action) => {
  switch (action.type) {
    case ON_CREATE_BOARD: {
      let newData = [...state.data];
      newData.push({ id: action.id, name: action.name, visibility: true });
      return { ...state, data: newData };
    }
    case ON_SET_BOARDS: {
      if (!action.data) {
        return state;
      }
      let newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_CLEAR_DATA: {  
      return { ...state, data: action.payload.newData };
    }
    case ON_SET_IS_FETCHING_BOARDS: {
      return { ...state, isFetching: action.isFetching };
    }
    case ON_DELETE_BOARD: {
      let newData = state.data.filter((el) => action.boardId !== el.id);
      return { ...state, data: newData };
    }
    case ON_SET_VISIBILITY_BOARD: {
      let newData = state.data.map((el) => {
        if (action.boardId === el.id) {
          el.visibility = action.visibility;
        }
        return el;
      });
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default BoardReduser;
