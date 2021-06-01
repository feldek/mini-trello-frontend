import { Dispatch } from "react";

import { api } from "../../Api/Api";
import { boardConsts, BoardThunkType, BoardActionsType, DataBoardType } from "./BoardTypes";
import { RootStateType } from "../Store";
import { notificationAntd } from "../User/UserAction";
import { ON_CLEAR_DATA } from "../User/UserConstants";

export const boardActions = {
  onSetBoards: (data: DataBoardType[]) => ({ type: boardConsts.ON_SET_BOARDS, payload: [...data] } as const),

  onCreateBoardStart: ({ id, name, visibility = true }: DataBoardType) =>
    ({ type: boardConsts.ON_CREATE_BOARD, payload: { id, name, visibility } } as const),

  onCreateBoardError: ({ boardId, listsId }: { boardId: string; listsId: string }) =>
    ({ type: boardConsts.ON_DELETE_BOARD, payload: { boardId, listsId } } as const),

  onDeleteBoardSuccess: ({ boardId, listsId }: { boardId: string; listsId: string }) =>
    ({ type: boardConsts.ON_DELETE_BOARD, payload: { boardId, listsId } } as const),

  onDeleteBoardStart: ({ boardId }: { boardId: string }) =>
    ({ type: boardConsts.ON_SET_VISIBILITY_BOARD, payload: { boardId, visibility: false } } as const),

  onDeleteBoardError: ({ boardId }: { boardId: string }) =>
    ({ type: boardConsts.ON_SET_VISIBILITY_BOARD, payload: { boardId, visibility: true } } as const),

  onSetIsFenchingBoards: (isFetching: boolean) =>
    ({ type: boardConsts.ON_SET_IS_FETCHING_BOARDS, payload: { isFetching } } as const),

  onClearData: (payload = []) => ({ type: ON_CLEAR_DATA, payload } as const),
};

export const getBoards = (): BoardThunkType => {
  return async (dispatch) => {
    dispatch(boardActions.onSetIsFenchingBoards(true));
    const boards = await api.getRequestAuth<{
      payload: [{ id: string; name: string }];
      status: boolean;
    }>("boards");
    if (boards.status) {
      dispatch(boardActions.onSetBoards(boards.payload));
    }
    dispatch(boardActions.onSetIsFenchingBoards(false));
  };
};

export const createBoard =
  ({ name, id }: DataBoardType): BoardThunkType =>
  async (dispatch: Dispatch<BoardActionsType>, getState: () => RootStateType) => {
    dispatch(boardActions.onCreateBoardStart({ name, id }));
    const result = await api.postRequestAuth<{ status: boolean }>("board", {
      name,
      id,
    });
    if (!result.status) {
      notificationAntd(result);
      const listsId = getState()
        .lists.data.filter((el: any) => el.boardId === id)
        .map((el: any) => el.id);
      dispatch(boardActions.onCreateBoardError({ boardId: id, listsId }));
    }
  };

export const deleteBoard =
  ({ boardId }: { boardId: string }): BoardThunkType =>
  async (dispatch, getState) => {
    dispatch(boardActions.onDeleteBoardStart({ boardId }));
    const result = await api.deleteRequestAuth<{ status: boolean }>("board", { id: boardId });
    if (!result.status) {
      dispatch(boardActions.onDeleteBoardError({ boardId }));
    } else {
      const listsId = getState()
        .lists.data.filter((el: any) => el.boardId === boardId)
        .map((el: any) => el.id);
      boardActions.onDeleteBoardSuccess({ boardId, listsId });
    }
  };
