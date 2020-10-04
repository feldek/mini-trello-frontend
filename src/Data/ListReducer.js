import { api } from "../Api/Api";
const CREATE_LIST = "CREATE_LIST";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";
const SET_LISTS = "SET_LISTS";
const CLEAR_DATA = "CLEAR_DATA";

const ListReduser = (state = [], action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let newState = [...action.state];
      newState.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
      });
      return newState;
    }
    case DELETE_LIST: {
      let newState = action.state.filter((el) => action.listId !== el.id);
      return newState;
    }
    case SET_LISTS: {
      let newState = [...action.state];
      if (action.response.length > 0) {
        if (!newState.find((el) => el.boardId === action.response[0].boardId)) {
          newState = newState.concat(action.response);
        }
      }
      return newState;
    }
    case CLEAR_DATA: {
      let newState = [...action.state];
      return newState;
    }
    case DELETE_BOARD: {
      let newState = action.stateList.filter((item) => action.boardId !== item.boardId);
      return newState;
    }
    default:
      return state;
  }
};

export const createList = (state, { name, boardId, id }) => {
  return {
    type: CREATE_LIST,
    state,
    name,
    boardId,
    id,
  };
};

export const deleteList = (state, { listId, stateTask }) => {
  return { type: DELETE_LIST, state, listId, stateTask };
};

export const setLists = (state, { response }) => {
  return { type: SET_LISTS, state, response };
};

export const reqGetLists = (state, { boardId }) => (dispatch) => {
  return api.getRequest("lists/getCurrentLists", { boardId }).then(
    (result) => {
      dispatch(setLists(state, { response: result }));
      return result;
    },
    (error) => {
      console.log(error);
    }
  );
};

export const reqCreateList = (state, { boardId, name }) => (dispatch) => {
  return api.postRequest("lists/createList", { boardId, name }).then(
    async (result) => {
      if (result.createdList === true) {
        await dispatch(createList(state, { name, id: result.id, boardId }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const reqDeleteList = (state, { listId, stateTask }) => (dispatch) => {
  return api.deleteRequest("lists/deleteList", { id: listId }).then(
    async (result) => {
      if (result.deletedList === true) {
        await dispatch(deleteList(state, { listId, stateTask }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export default ListReduser;
