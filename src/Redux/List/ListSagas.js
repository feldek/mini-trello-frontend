import { put, all, call, takeLatest } from "redux-saga/effects";
import { uuid } from "uuidv4";
import { api } from "../../Api/Api";
import { listActions } from "./ListActions";
import { LIST_SAGA } from "./ListTypes";

export const getListsSaga = ({ boardId }) => ({ type: LIST_SAGA.GET_LISTS, boardId });
function* watchGetLists({ boardId }) {
  yield put(listActions.onSetIsFenchingLists(true));
  const lists = yield call(() => api.getRequestAuth("lists", { boardId }));
  if (lists.status) {
    yield put(listActions.onSetLists({ data: lists.payload }));
  }
  yield put(listActions.onSetIsFenchingLists(false));
}

export const createListSaga = ({ boardId, name }) => ({ type: LIST_SAGA.CREATE_LIST, boardId, name });
function* watchCreateList({ boardId, name }) {
  const id = yield uuid();
  yield put(listActions.onCreateListStart({ name, id, boardId }));
  const result = yield call(() => api.postRequestAuth("lists", { lists: [{ boardId, name, id }] }));
  if (!result.status) {
    yield put(listActions.onCreateListError({ listId: id }));
  }
}

export const createListsSaga = (data = []) => ({ type: LIST_SAGA.CREATE_LISTS, data });
function* watchCreateLists(data = []) {
  const result = yield call(() => api.postRequestAuth("lists", { lists: data }));
  if (result.status) {
    yield put(listActions.onCreateListStart(data));
  }
}

export const deleteListSaga = ({ listId }) => ({ type: LIST_SAGA.DELETE_LIST, listId });

function* watchDeleteList({ listId }) {
  yield put(listActions.onDeleteListStart({ listId }));
  const result = yield call(() => api.deleteRequestAuth("list", { id: listId }));
  if (!result.status) {
    yield put(listActions.onDeleteListError({ listId }));
  } else {
    yield put(listActions.onDeleteListSuccess({ listId }));
  }
}

function* sagas() {
  yield all([
    takeLatest(LIST_SAGA.GET_LISTS, watchGetLists),
    takeLatest(LIST_SAGA.CREATE_LIST, watchCreateList),
    takeLatest(LIST_SAGA.CREATE_LISTS, watchCreateLists),
    takeLatest(LIST_SAGA.DELETE_LIST, watchDeleteList),
  ]);
}
export const listSaga = sagas;
