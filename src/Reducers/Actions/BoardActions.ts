import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { api } from "../../Api/Api";
import { DataBoardType } from "../BoardReducer";
import { RootStateType } from "../Store";
import { notificationAntd } from "./UserAction";

export const ON_SET_BOARDS = "ON_SET_BOARDS";
export const ON_CREATE_BOARD = "ON_CREATE_BOARD";
export const ON_DELETE_BOARD = "ON_DELETE_BOARD";
export const ON_SET_VISIBILITY_BOARD = "ON_SET_VISIBILITY_BOARD";
export const ON_CLEAR_DATA = "user/onClearData";
export const ON_SET_IS_FETCHING_BOARDS = "ON_SET_IS_FETCHING_BOARDS";

export type ActionsBoardType =
  | onSetBoardsType
  | onCreateBoardStartType
  | onCreateBoardErrorType
  | onDeleteBoardSuccessType
  | onDeleteBoardStartType
  | onDeleteBoardErrorType
  | onClearData
  | onSetIsFenchingBoardsType;

export type onClearData = {
  type: typeof ON_CLEAR_DATA;
  payload: { newData: [] };
};

type onSetBoardsType = { type: typeof ON_SET_BOARDS; data: DataBoardType[] };
export const onSetBoards = (data: DataBoardType[]): onSetBoardsType => {
  return { type: ON_SET_BOARDS, data };
};

export const getBoards = (): ThunkType => {
  return async (dispatch) => {
    // export const getBoards = (): ThunkType => async (dispatch) => {
    dispatch(onSetIsFenchingBoards(true));

    const boards: any = await api.getRequestAuth("boards");
    console.log(boards.payload);
    if (boards.status) {
      dispatch(onSetBoards(boards.payload));
    }
    dispatch(onSetIsFenchingBoards(false));
  };
};

export const getRequestAuth = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
};

export const http = async () => {
  const boards = await getRequestAuth<{ payload: [] }>("request");
  return boards;
};

const test = () => {
  return new Promise(() => api.getRequestAuth("boards"));
};

type onCreateBoardStartType = {
  type: typeof ON_CREATE_BOARD;
  id: string;
  name: string;
  visibility: boolean;
};
export const onCreateBoardStart = ({
  id,
  name,
  visibility = true,
}: DataBoardType): onCreateBoardStartType => {
  return { type: ON_CREATE_BOARD, id, name, visibility };
};
type onCreateBoardErrorType = {
  type: typeof ON_DELETE_BOARD;
  boardId: string;
  listsId: string;
};
export const onCreateBoardError = ({
  boardId,
  listsId,
}: {
  boardId: string;
  listsId: string;
}): onCreateBoardErrorType => {
  return { type: ON_DELETE_BOARD, boardId, listsId };
};

export const createBoard = ({ name, id }: DataBoardType) => async (
  dispatch: Dispatch<ActionsBoardType>,
  getState: () => RootStateType
) => {
  dispatch(onCreateBoardStart({ name, id }));
  let result: any = await api.postRequestAuth("board", { name, id });
  if (!result.status) {
    notificationAntd(result);
    let listsId = getState()
      .lists.data.filter((el: any) => el.boardId === id)
      .map((el: any) => el.id);
    dispatch(onCreateBoardError({ boardId: id, listsId }));
  }
  return result;
};
type onDeleteBoardSuccessType = {
  type: typeof ON_DELETE_BOARD;
  boardId: string;
  listsId: string;
};
export const onDeleteBoardSuccess = ({
  boardId,
  listsId,
}: {
  boardId: string;
  listsId: string;
}): onDeleteBoardSuccessType => {
  return { type: ON_DELETE_BOARD, boardId, listsId };
};

type onDeleteBoardStartType = {
  type: typeof ON_SET_VISIBILITY_BOARD;
  boardId: string;
  visibility: boolean;
};
export const onDeleteBoardStart = ({
  boardId,
}: {
  boardId: string;
}): onDeleteBoardStartType => {
  return { type: ON_SET_VISIBILITY_BOARD, boardId, visibility: false };
};
type onDeleteBoardErrorType = {
  type: typeof ON_SET_VISIBILITY_BOARD;
  boardId: string;
  visibility: boolean;
};
export const onDeleteBoardError = ({
  boardId,
}: {
  boardId: string;
}): onDeleteBoardErrorType => {
  return { type: ON_SET_VISIBILITY_BOARD, boardId, visibility: true };
};
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsBoardType>;
type DeleteBoardType = { boardId: string };
export const deleteBoard = ({ boardId }: DeleteBoardType): ThunkType => async (
  dispatch,
  getState
) => {
  dispatch(onDeleteBoardStart({ boardId }));
  let result = await api.deleteRequestAuth("board", { id: boardId });
  if (!result.status) {
    dispatch(onDeleteBoardError({ boardId }));
  } else {
    let listsId = getState()
      .lists.data.filter((el: any) => el.boardId === boardId)
      .map((el: any) => el.id);
    onDeleteBoardSuccess({ boardId, listsId });
  }
};
type onSetIsFenchingBoardsType = {
  type: typeof ON_SET_IS_FETCHING_BOARDS;
  isFetching: boolean;
};
export const onSetIsFenchingBoards = (isFetching: boolean): onSetIsFenchingBoardsType => {
  return { type: ON_SET_IS_FETCHING_BOARDS, isFetching };
};
