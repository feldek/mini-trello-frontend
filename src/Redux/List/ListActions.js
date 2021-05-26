import { uuid } from 'uuidv4';
import { api } from '../../Api/Api';

export const ON_CREATE_LIST = 'ON_CREATE_LIST';
export const ON_CREATE_LISTS = 'ON_CREATE_LISTS';
export const ON_DELETE_LIST = 'ON_DELETE_LIST';
export const ON_DELETE_BOARD = 'ON_DELETE_BOARD';
export const ON_SET_LISTS = 'ON_SET_LISTS';
export const ON_SET_VISIBILITY_LIST = 'ON_SET_VISIBILITY_LIST';
export const ON_SET_IS_FETCHING_LISTS = 'ON_SET_IS_FETCHING_LISTS';

export const onSetLists = ({ data }) => ({ type: ON_SET_LISTS, data });
export const onSetIsFenchingLists = (isFetching) => ({ type: ON_SET_IS_FETCHING_LISTS, isFetching });
export const getLists = ({ boardId }) => async (dispatch) => {
  dispatch(onSetIsFenchingLists(true));
  const lists = await api.getRequestAuth('lists', { boardId });

  if (lists.status) {
    dispatch(onSetLists({ data: lists.payload }));
  }
  dispatch(onSetIsFenchingLists(false));
};

export const onCreateListStart = ({ name, boardId, id }) => ({
  type: ON_CREATE_LIST, name, boardId, id,
});
export const onCreateListError = ({ listId }) => ({ type: ON_DELETE_LIST, listId });
export const createList = ({ boardId, name }) => async (dispatch) => {
  const id = uuid();
  dispatch(onCreateListStart({ name, id, boardId }));
  const result = await api.postRequestAuth('lists', { lists: [{ boardId, name, id }] });
  if (!result.status) {
    dispatch(onCreateListError({ listId: id }));
  }
};
export const onCreateListsStart = (data = []) => ({ type: ON_CREATE_LISTS, data });

export const createLists = (data = []) => async (dispatch) => {
  const result = await api.postRequestAuth('lists', { lists: data });
  if (result.status) {
    dispatch(onCreateListsStart(data));
  }
  return result;
};

export const onDeleteListSuccess = ({ listId }) => ({ type: ON_DELETE_LIST, listId });
export const onDeleteListStart = ({ listId }) => ({ type: ON_SET_VISIBILITY_LIST, listId, visibility: false });
export const onDeleteListError = ({ listId }) => ({ type: ON_SET_VISIBILITY_LIST, listId, visibility: true });
export const deleteList = ({ listId }) => async (dispatch) => {
  dispatch(onDeleteListStart({ listId }));
  const result = await api.deleteRequestAuth('list', { id: listId });
  if (!result.status) {
    dispatch(onDeleteListError({ listId }));
  } else {
    dispatch(onDeleteListSuccess({ listId }));
  }
};
