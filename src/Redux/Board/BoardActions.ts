import { Dispatch } from "react";

import {
  DataBoardType,
  onSetBoardsType,
  onCreateBoardStartType,
  onCreateBoardErrorType,
  onDeleteBoardSuccessType,
  onDeleteBoardStartType,
  onDeleteBoardErrorType,  
  onSetIsFenchingBoardsType,
  ActionsBoardType,
  ThunkBoardType
} from "./BoardTypes";
import { api } from "../../Api/Api";
import { RootStateType } from "../Store";
import { notificationAntd } from "../User/UserAction";

export const ON_SET_BOARDS = "ON_SET_BOARDS";
export const ON_CREATE_BOARD = "ON_CREATE_BOARD";
export const ON_DELETE_BOARD = "ON_DELETE_BOARD";
export const ON_SET_VISIBILITY_BOARD = "ON_SET_VISIBILITY_BOARD";
export const ON_SET_IS_FETCHING_BOARDS = "ON_SET_IS_FETCHING_BOARDS";

export const onSetBoards = (data: DataBoardType[]): onSetBoardsType => {
  return { type: ON_SET_BOARDS, data };
};

export const getBoards = (): ThunkBoardType => {
  return async (dispatch) => {
    dispatch(onSetIsFenchingBoards(true));
    const boards = await api.getRequestAuth<{
      payload: [{ id: string; name: string }];
      status: boolean;
    }>("boards");
    if (boards.status) {
      dispatch(onSetBoards(boards.payload));
    }
    dispatch(onSetIsFenchingBoards(false));
  };
};

export const onCreateBoardStart = ({ id, name, visibility = true }: DataBoardType): onCreateBoardStartType => {
  return { type: ON_CREATE_BOARD, id, name, visibility };
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

export const createBoard =
  ({ name, id }: DataBoardType): ThunkBoardType =>
  async (dispatch: Dispatch<ActionsBoardType>, getState: () => RootStateType) => {
    dispatch(onCreateBoardStart({ name, id }));
    const result = await api.postRequestAuth<{ status: boolean }>("board", {
      name,
      id,
    });
    if (!result.status) {
      notificationAntd(result);
      const listsId = getState()
        .lists.data.filter((el: any) => el.boardId === id)
        .map((el: any) => el.id);
      dispatch(onCreateBoardError({ boardId: id, listsId }));
    }
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

export const onDeleteBoardStart = ({ boardId }: { boardId: string }): onDeleteBoardStartType => {
  return { type: ON_SET_VISIBILITY_BOARD, boardId, visibility: false };
};

export const onDeleteBoardError = ({ boardId }: { boardId: string }): onDeleteBoardErrorType => {
  return { type: ON_SET_VISIBILITY_BOARD, boardId, visibility: true };
};


export const deleteBoard =
  ({ boardId }: { boardId: string }): ThunkBoardType =>
  async (dispatch, getState) => {
    dispatch(onDeleteBoardStart({ boardId }));
    const result = await api.deleteRequestAuth<{ status: boolean }>("board", { id: boardId });
    if (!result.status) {
      dispatch(onDeleteBoardError({ boardId }));
    } else {
      const listsId = getState()
        .lists.data.filter((el: any) => el.boardId === boardId)
        .map((el: any) => el.id);
      onDeleteBoardSuccess({ boardId, listsId });
    }
  };

export const onSetIsFenchingBoards = (isFetching: boolean): onSetIsFenchingBoardsType => {
  return { type: ON_SET_IS_FETCHING_BOARDS, isFetching };
};


