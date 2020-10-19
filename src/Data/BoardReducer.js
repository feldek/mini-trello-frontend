import {
  ON_CLEARED_DATA,
  ON_CREATED_BOARD,
  ON_DELETED_BOARD,
  ON_SETTED_BOARDS,
  ON_SETTED_IS_FETCHING_BOARDS,
  ON_SETTED_VISIBILITY_BOARD,
} from "./Actions/BoardActions";

const initState = {
  data: [],
  isFetching: false,
};

const BoardReduser = (state = initState, action) => {
  switch (action.type) {
    case ON_CREATED_BOARD: {
      let newData = [...state.data];
      newData.push({ id: action.id, name: action.name, visibility: true });
      return { ...state, data: newData };
    }
    case ON_SETTED_BOARDS: {
      if (!action.data) {
        return state;
      }
      let newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_CLEARED_DATA: {
      let newData = [];
      return { ...state, data: newData };
    }
    case ON_SETTED_IS_FETCHING_BOARDS: {
      return { ...state, isFetching: action.isFetching };
    }
    case ON_DELETED_BOARD: {
      let newData = [...state.data];
      newData = newData.filter((el) => action.boardId !== el.id);
      return { ...state, data: newData };
    }
    case ON_SETTED_VISIBILITY_BOARD: {
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
