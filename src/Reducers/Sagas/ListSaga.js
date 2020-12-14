import { put, takeEvery, all, call } from "redux-saga/effects";
import { uuid } from "uuidv4";
import { api } from "../../Api/Api";
import {
  onCreateListError,
  onCreateListStart,
  onDeleteListError,
  onDeleteListStart,
  onDeleteListSuccess,
  onSetIsFenchingLists,
  onSetLists,
} from "../Actions/ListActions";

const GET_LISTS = "GET_LISTS";
const CREATE_LIST = "CREATE_LIST";
const CREATE_LISTS = "CREATE_LISTS";
const DELETE_LIST = "DELETE_LIST";

export const getListsSaga = ({ boardId }) => {
  return { type: GET_LISTS, boardId };
};
function* watchGetLists() {
  yield takeEvery(GET_LISTS, function* ({ boardId }) {
    yield put(onSetIsFenchingLists(true));
    const lists = yield call(() => api.getRequestAuth("lists", { boardId }));
    if (lists.status) {
      yield put(onSetLists({ data: lists.payload }));
    }
    yield put(onSetIsFenchingLists(false));
  });
}

export const createListSaga = ({ boardId, name }) => {
  return { type: CREATE_LIST, boardId, name };
};
function* watchCreateList() {
  yield takeEvery(CREATE_LIST, function* ({ boardId, name }) {
    let id = yield uuid();
    yield put(onCreateListStart({ name, id, boardId }));
    const result = yield call(() =>
      api.postRequestAuth("lists", { lists: [{ boardId, name, id }] })
    );
    if (!result.status) {
      yield put(onCreateListError({ listId: id }));
    }
  });
}

export const createListsSaga = (data = []) => {
  return { type: CREATE_LISTS, data };
};
function* watchCreateLists() {
  yield takeEvery(CREATE_LISTS, function* (data = []) {
    const result = yield call(() => api.postRequestAuth("lists", { lists: data }));
    if (result.status) {
      yield put(onCreateListStart(data));
    }
  });
}

export const deleteListSaga = ({ listId }) => {
  return { type: DELETE_LIST, listId };
};

function* watchDeleteList() {
  yield takeEvery(DELETE_LIST, function* ({ listId }) {
    yield put(onDeleteListStart({ listId }))
    const result = yield call(() => api.deleteRequestAuth("list", { id: listId }));
    if (!result.status) {
      yield put(onDeleteListError({ listId }));
    } else {
      yield put(onDeleteListSuccess({ listId }));
    }
  });
}

export default function* listSaga() {
  yield all([watchGetLists(), watchCreateList(), watchCreateLists(), watchDeleteList()]);
}
