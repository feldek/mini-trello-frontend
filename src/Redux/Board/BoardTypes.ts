import { BaseThunkType, InferActionsTypes } from './../Store';
import { boardActions } from './BoardActions';

export const boardConsts = {
  ON_SET_BOARDS: "ON_SET_BOARDS",
  ON_CREATE_BOARD: "ON_CREATE_BOARD",
  ON_DELETE_BOARD: "ON_DELETE_BOARD",
  ON_SET_VISIBILITY_BOARD: "ON_SET_VISIBILITY_BOARD",
  ON_SET_IS_FETCHING_BOARDS: "ON_SET_IS_FETCHING_BOARDS",
} as const;

export const boardSagas = {
  GET_BOARDS: "board/getBoards",
  CREATE_BOARD: "board/createBoard",
  DELETE_BOARD: "board/deleteBoard",
};

export type DataBoardType = { name: string; id: string; visibility?: boolean };
export type InitialBoardType = { data: DataBoardType[]; isFetching: boolean };


export type BoardActionsType = InferActionsTypes<typeof boardActions>;
export type BoardThunkType = BaseThunkType<BoardActionsType>;



