import { BoardActionsType, DataBoardType, InitialBoardType } from "./BoardTypes";
import { boardConsts } from "./BoardTypes";
import { ON_CLEAR_DATA } from "../User/UserConstants";

const initialState: InitialBoardType = { data: [] as DataBoardType[], isFetching: false };

const BoardReduser = (state = initialState, action: BoardActionsType): InitialBoardType => {
  switch (action.type) {
    case boardConsts.ON_CREATE_BOARD: {
      const {
        payload: { id, name, visibility },
      } = action;
      return { ...state, data: [...state.data, { id, name, visibility }] };
    }
    case boardConsts.ON_SET_BOARDS: {
      if (!action.payload) {
        return state;
      }
      const newData = action.payload.map((el) => {
        el.visibility = true;
        return el;
      });
      return { ...state, data: newData };
    }
    case ON_CLEAR_DATA: {
      return { ...state, data: [] };
    }
    case boardConsts.ON_SET_IS_FETCHING_BOARDS: {
      return { ...state, isFetching: action.payload.isFetching };
    }
    case boardConsts.ON_DELETE_BOARD: {
      const newData = state.data.filter((el) => action.payload.boardId !== el.id);
      return { ...state, data: newData };
    }
    case boardConsts.ON_SET_VISIBILITY_BOARD: {
      const newData = state.data.map((el) => {
        if (action.payload.boardId === el.id) {
          el.visibility = action.payload.visibility;
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
