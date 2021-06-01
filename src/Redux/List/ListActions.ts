import { uuid } from "uuidv4";
import { api } from "../../Api/Api";
import { boardConsts } from "../Board/BoardTypes";
import { ON_CLEAR_DATA } from "../User/UserConstants";
import { DataListType, listConsts, ListThunkType } from "./ListTypes";

export const listActions = {
  onSetLists: ({ data }: { data: DataListType[] }) => ({ type: listConsts.ON_SET_LISTS, data } as const),
  onSetIsFenchingLists: (isFetching: boolean) => ({ type: listConsts.ON_SET_IS_FETCHING_LISTS, isFetching } as const),
  onCreateListStart: ({ name, boardId, id }: DataListType) =>
    ({ type: listConsts.ON_CREATE_LIST, name, boardId, id } as const),
  onCreateListError: ({ listId }: { listId: string }) => ({ type: listConsts.ON_DELETE_LIST, listId } as const),
  onCreateListsStart: (data: DataListType[]) => ({ type: listConsts.ON_CREATE_LISTS, data } as const),
  onDeleteListSuccess: ({ listId }: { listId: string }) => ({ type: listConsts.ON_DELETE_LIST, listId } as const),
  onDeleteListStart: ({ listId }: { listId: string }) =>
    ({ type: listConsts.ON_SET_VISIBILITY_LIST, listId, visibility: false } as const),
  onDeleteListError: ({ listId }: { listId: string }) =>
    ({ type: listConsts.ON_SET_VISIBILITY_LIST, listId, visibility: true } as const),
  onClearData: (payload = []) => ({ type: ON_CLEAR_DATA, payload } as const),
  onDeleteBoard: ({ boardId }: { boardId: string }) =>
    ({ type: boardConsts.ON_DELETE_BOARD, payload: { boardId } } as const),
};

export const getLists =
  ({ boardId }: { boardId: string }): ListThunkType =>
  async (dispatch) => {
    dispatch(listActions.onSetIsFenchingLists(true));
    const lists = await api.getRequestAuth<{ payload: DataListType[]; status: boolean }>("lists", { boardId });

    if (lists.status) {
      dispatch(listActions.onSetLists({ data: lists.payload }));
    }
    dispatch(listActions.onSetIsFenchingLists(false));
  };

export const createList =
  ({ boardId, name }: { boardId: string; name: string }): ListThunkType =>
  async (dispatch) => {
    const id = uuid();
    dispatch(listActions.onCreateListStart({ name, id, boardId }));
    const result = await api.postRequestAuth<{ status: boolean }>("lists", { lists: [{ boardId, name, id }] });
    if (!result.status) {
      dispatch(listActions.onCreateListError({ listId: id }));
    }
  };

export const createLists =
  (data: DataListType[]): ListThunkType =>
  async (dispatch) => {
    const result = await api.postRequestAuth<any>("lists", { lists: data });
    if (result.status) {
      dispatch(listActions.onCreateListsStart(data));
    }
    return result;
  };

export const deleteList =
  ({ listId }: { listId: string }): ListThunkType =>
  async (dispatch) => {
    dispatch(listActions.onDeleteListStart({ listId }));
    const result = await api.deleteRequestAuth<{ status: boolean }>("list", { id: listId });
    if (!result.status) {
      dispatch(listActions.onDeleteListError({ listId }));
    } else {
      dispatch(listActions.onDeleteListSuccess({ listId }));
    }
  };
