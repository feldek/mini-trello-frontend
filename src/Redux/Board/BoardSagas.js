import { put, all, select, takeLatest } from "redux-saga/effects";
import { api } from "../../Api/Api";
import { boardActions } from "./BoardActions";
import { notificationAntd } from "../User/UserAction";
import { boardSagas } from "./BoardTypes";

export const getBoardsSaga = () => ({ type: boardSagas.GET_BOARDS });
function* watchGetBoards() {
  try {
    yield put(boardActions.onSetIsFenchingBoards(true));
    const boards = yield api.getRequestAuth("boards");
    if (boards.status) {
      yield put(boardActions.onSetBoards(boards.payload));
    }
  } finally {
    yield put(boardActions.onSetIsFenchingBoards(false));
  }
}

export const createBoardsSaga = ({ name, id }) => ({ type: boardSagas.CREATE_BOARD, name, id });
function* watchCreateBoards({ name, id }) {
  yield put(boardActions.onCreateBoardStart({ name, id }));
  const result = yield api.postRequestAuth("board", { name, id });
  if (!result.status) {
    notificationAntd(result);
    const listsId = yield select((state) => state.lists.data.filter((el) => el.boardId === id).map((el) => el.id));
    yield put(boardActions.onCreateBoardError({ boardId: id, listsId }));
  }
}

export const deleteBoardsSaga = ({ boardId }) => ({ type: boardSagas.DELETE_BOARD, boardId });
function* watchDeleteBoards({ boardId }) {
  yield put(boardActions.onDeleteBoardStart({ boardId }));
  const result = yield api.deleteRequestAuth("board", { id: boardId });
  if (!result.status) {
    yield put(boardActions.onDeleteBoardError({ boardId }));
  } else {
    const listsId = yield select((state) => state.lists.data.filter((el) => el.boardId === boardId).map((el) => el.id));
    yield put(boardActions.onDeleteBoardSuccess({ boardId, listsId }));
  }
}

function* sagas() {
  yield all([
    takeLatest(boardSagas.GET_BOARDS, watchGetBoards),
    takeLatest(boardSagas.CREATE_BOARD, watchCreateBoards),
    takeLatest(boardSagas.DELETE_BOARD, watchDeleteBoards),
  ]);
}

export const boardSaga = sagas;
