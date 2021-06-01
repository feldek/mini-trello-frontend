import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../Store";

import { ON_CLEAR_DATA } from "../User/UserConstants";

export const ON_SET_BOARDS = "ON_SET_BOARDS";
export const ON_CREATE_BOARD = "ON_CREATE_BOARD";
export const ON_DELETE_BOARD = "ON_DELETE_BOARD";
export const ON_SET_VISIBILITY_BOARD = "ON_SET_VISIBILITY_BOARD";
export const ON_SET_IS_FETCHING_BOARDS = "ON_SET_IS_FETCHING_BOARDS";

export const test = { ON_SET_IS_FETCHING_BOARDS: "ON_SET_IS_FETCHING_BOARDS" };

export const BOARD_SAGAS = {
  GET_BOARDS: "board/getBoards",
  CREATE_BOARD: "board/createBoard",
  DELETE_BOARD: "board/deleteBoard",
};

export type DataBoardType = { name: string; id: string; visibility?: boolean };
export type InitialBoardType = { data: DataBoardType[]; isFetching: boolean };

export type onClearData = {
  type: typeof ON_CLEAR_DATA;
  payload: { newData: [] };
};

export type onSetBoardsType = { type: typeof ON_SET_BOARDS; data: DataBoardType[] };

export type onCreateBoardStartType = {
  type: typeof ON_CREATE_BOARD;
  id: string;
  name: string;
  visibility: boolean;
};

export type onCreateBoardErrorType = {
  type: typeof ON_DELETE_BOARD;
  boardId: string;
  listsId: string;
};

export type onDeleteBoardSuccessType = {
  type: typeof ON_DELETE_BOARD;
  boardId: string;
  listsId: string;
};

export type onDeleteBoardStartType = {
  type: typeof ON_SET_VISIBILITY_BOARD;
  boardId: string;
  visibility: boolean;
};

export type onDeleteBoardErrorType = {
  type: typeof ON_SET_VISIBILITY_BOARD;
  boardId: string;
  visibility: boolean;
};

export type onSetIsFenchingBoardsType = {
  type: typeof ON_SET_IS_FETCHING_BOARDS;
  isFetching: boolean;
};

export type ActionsBoardType =
  | onSetBoardsType
  | onCreateBoardStartType
  | onCreateBoardErrorType
  | onDeleteBoardSuccessType
  | onDeleteBoardStartType
  | onDeleteBoardErrorType
  | onClearData
  | onSetIsFenchingBoardsType;

export type ThunkBoardType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsBoardType>;
