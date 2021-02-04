import {
  put, takeEvery, all, call, select,
} from 'redux-saga/effects';
import { api } from '../../Api/Api';
import {
  onCreateBoardError,
  onCreateBoardStart,
  onDeleteBoardError,
  onDeleteBoardStart,
  onDeleteBoardSuccess,
  onSetBoards,
  onSetIsFenchingBoards,
} from '../Actions/BoardActions';
import { notificationAntd } from '../Actions/UserAction';

const GET_BOARDS = 'GET_BOARDS';
const CREATE_BOARDS = 'CREATE_BOARDS';
const DELETE_BOARDS = 'DELETE_BOARDS';

export const getBoardsSaga = () => ({ type: GET_BOARDS });
export function* watchGetBoards() {
  // yield takeEvery(GET_BOARDS, function* () {
    yield put(onSetIsFenchingBoards(true));
    const boards = yield call(() => api.getRequestAuth('boards'));
    if (boards.status) {
      yield put(onSetBoards(boards.payload));
    }
    yield put(onSetIsFenchingBoards(false));
  // });
}

export const createBoardsSaga = ({ name, id }) => ({ type: CREATE_BOARDS, name, id });
function* watchCreateBoards() {
  yield takeEvery(CREATE_BOARDS, function* ({ name, id }) {
    yield put(onCreateBoardStart({ name, id }));
    const result = yield call(() => api.postRequestAuth('board', { name, id }));
    if (!result.status) {
      notificationAntd(result);
      const listsId = yield select((state) => state.lists.data.filter((el) => el.boardId === id).map((el) => el.id));
      yield put(onCreateBoardError({ boardId: id, listsId }));
    }
  });
}

export const deleteBoardsSaga = ({ boardId }) => ({ type: DELETE_BOARDS, boardId });
function* watchDeleteBoards() {
  yield takeEvery(DELETE_BOARDS, function* ({ boardId }) {
    yield put(onDeleteBoardStart({ boardId }));
    const result = yield call(() => api.deleteRequestAuth('board', { id: boardId }));
    if (!result.status) {
      yield put(onDeleteBoardError({ boardId }));
    } else {
      const listsId = yield select((state) => state.lists.data.filter((el) => el.boardId === boardId).map((el) => el.id));
      yield put(onDeleteBoardSuccess({ boardId, listsId }));
    }
  });
}

export default function* boardSaga() {
  yield all([
    watchGetBoards(),
    watchCreateBoards(),
    watchDeleteBoards(),
  ]);
}
