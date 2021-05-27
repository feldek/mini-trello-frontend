import { put, all, select, takeLatest } from "redux-saga/effects";
import { api } from "../../Api/Api";
import {
  onCreateBoardError,
  onCreateBoardStart,
  onDeleteBoardError,
  onDeleteBoardStart,
  onDeleteBoardSuccess,
  onSetBoards,
  onSetIsFenchingBoards,
} from "./BoardActions";
import { notificationAntd } from "../User/UserAction";
import { BOARD_SAGAS } from "./BoardConstants.ts";

export const getBoardsSaga = () => ({ type: BOARD_SAGAS.GET_BOARDS });
function* watchGetBoards() {
  yield put(onSetIsFenchingBoards(true));
  const boards = yield api.getRequestAuth("boards");
  if (boards.status) {
    yield put(onSetBoards(boards.payload));
  }
  yield put(onSetIsFenchingBoards(false));
}

export const createBoardsSaga = ({ name, id }) => ({ type: BOARD_SAGAS.CREATE_BOARD, name, id });
function* watchCreateBoards({ name, id }) {
  yield put(onCreateBoardStart({ name, id }));
  const result = yield api.postRequestAuth("board", { name, id });
  if (!result.status) {
    notificationAntd(result);
    const listsId = yield select((state) => state.lists.data.filter((el) => el.boardId === id).map((el) => el.id));
    yield put(onCreateBoardError({ boardId: id, listsId }));
  }
}

export const deleteBoardsSaga = ({ boardId }) => ({ type: BOARD_SAGAS.DELETE_BOARD, boardId });
function* watchDeleteBoards({ boardId }) {
  yield put(onDeleteBoardStart({ boardId }));
  const result = yield api.deleteRequestAuth("board", { id: boardId });
  if (!result.status) {
    yield put(onDeleteBoardError({ boardId }));
  } else {
    const listsId = yield select((state) => state.lists.data.filter((el) => el.boardId === boardId).map((el) => el.id));
    yield put(onDeleteBoardSuccess({ boardId, listsId }));
  }
}

function* sagas() {
  yield all([
    takeLatest(BOARD_SAGAS.GET_BOARDS, watchGetBoards),    
    takeLatest(BOARD_SAGAS.CREATE_BOARD, watchCreateBoards),
    takeLatest(BOARD_SAGAS.DELETE_BOARD, watchDeleteBoards),
  ]);
}

export const boardSaga = sagas;
