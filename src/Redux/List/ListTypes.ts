import { BaseThunkType, InferActionsTypes } from "../Store";
import { listActions } from "./ListActions";

export const listConsts = {
  ON_CREATE_LIST: "ON_CREATE_LIST",
  ON_CREATE_LISTS: "ON_CREATE_LISTS",
  ON_DELETE_LIST: "ON_DELETE_LIST",
  ON_SET_LISTS: "ON_SET_LISTS",
  ON_SET_VISIBILITY_LIST: "ON_SET_VISIBILITY_LIST",
  ON_SET_IS_FETCHING_LISTS: "ON_SET_IS_FETCHING_LISTS",
} as const;

export const LIST_SAGA = {
  GET_LISTS: "list/getLists",
  CREATE_LIST: "list/createList",
  CREATE_LISTS: "list/createLists",
  DELETE_LIST: "list/deleteList",
};

export type DataListType = { name: string; id: string; boardId: string; visibility?: boolean };
export type InitialListType = { data: DataListType[]; isFetching: boolean };

export type ListActionsType = InferActionsTypes<typeof listActions>;
export type ListThunkType = BaseThunkType<ListActionsType>;
