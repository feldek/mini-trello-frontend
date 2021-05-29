import { ActionsBoardType, InitialBoardType } from './BoardTypes';
import {  
  ON_SET_BOARDS,
  ON_CREATE_BOARD,
  ON_DELETE_BOARD,
  ON_SET_VISIBILITY_BOARD,
  ON_SET_IS_FETCHING_BOARDS,
} from "./BoardTypes";

import { ON_CLEAR_DATA } from "../User/UserConstants";

const initialState: InitialBoardType = { data: [], isFetching: false };

const BoardReduser = (state = initialState, action: ActionsBoardType): InitialBoardType => {
  switch (action.type) {
    case ON_CREATE_BOARD: {
      const newData = [...state.data];
      newData.push({ id: action.id, name: action.name, visibility: action.visibility });
      return { ...state, data: newData };
    }
    case ON_SET_BOARDS: {
      if (!action.data) {
        return state;
      }
      const newData = action.data.map((el) => {
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
      const newData = state.data.filter((el) => action.boardId !== el.id);
      return { ...state, data: newData };
    }
    case ON_SET_VISIBILITY_BOARD: {
      const newData = state.data.map((el) => {
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
