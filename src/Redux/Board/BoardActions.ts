import { Dispatch } from "react";

import * as types from "./BoardTypes";
import { api } from "../../Api/Api";
import { RootStateType } from "../Store";
import { notificationAntd } from "../User/UserAction";

export const onSetBoards = (data: types.DataBoardType[]): types.onSetBoardsType => {
  return { type: types.ON_SET_BOARDS, data };
};

export const getBoards = (): types.ThunkBoardType => {
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

export const onCreateBoardStart = ({
  id,
  name,
  visibility = true,
}: types.DataBoardType): types.onCreateBoardStartType => {
  return { type: types.ON_CREATE_BOARD, id, name, visibility };
};

export const onCreateBoardError = ({
  boardId,
  listsId,
}: {
  boardId: string;
  listsId: string;
}): types.onCreateBoardErrorType => {
  return { type: types.ON_DELETE_BOARD, boardId, listsId };
};

export const createBoard =
  ({ name, id }: types.DataBoardType): types.ThunkBoardType =>
  async (dispatch: Dispatch<types.ActionsBoardType>, getState: () => RootStateType) => {
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
}): types.onDeleteBoardSuccessType => {
  return { type: types.ON_DELETE_BOARD, boardId, listsId };
};

export const onDeleteBoardStart = ({ boardId }: { boardId: string }): types.onDeleteBoardStartType => {
  return { type: types.ON_SET_VISIBILITY_BOARD, boardId, visibility: false };
};

export const onDeleteBoardError = ({ boardId }: { boardId: string }): types.onDeleteBoardErrorType => {
  return { type: types.ON_SET_VISIBILITY_BOARD, boardId, visibility: true };
};

export const deleteBoard =
  ({ boardId }: { boardId: string }): types.ThunkBoardType =>
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

export const onSetIsFenchingBoards = (isFetching: boolean): types.onSetIsFenchingBoardsType => {
  return { type: types.ON_SET_IS_FETCHING_BOARDS, isFetching };
};
