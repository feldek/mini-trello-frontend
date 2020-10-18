import { uuid } from "uuidv4";
import { api } from "../Api/Api";
export const stepOrder = 100000;
const CREATE_TASK = "CREATE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const SET_TASKS = "SET_TASKS";
const DELETE_TASK = "DELETE_TASK";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";
const CREATE_DESCRIPTION = "CREATE_DESCRIPTION";
const DELETE_DESCRIPTION = "DELETE_DESCRIPTION";
const SET_VISIBILITY_TASK = "SET_VISIBILITY_TASK";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage ? localStorage.tasks : [];
const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK: {
      let newState = [...state];
      newState.push({
        name: action.name,
        description: "",
        id: action.id,
        order: action.order,
        listId: action.listId,
        visibility: true,
      });
      return newState;
    }
    case UPDATE_TASK: {
      let newState = state.filter((el) => {
        if (el.id === action.id) {
          el.listId = action.listId;
          el.order = action.order;
        }
        return el;
      });
      newState = newState.sort((a, b) => a.order - b.order);
      return newState;
    }
    case DELETE_TASK: {
      let newState = state.filter((item) => item.id !== action.id);
      return newState;
    }
    case SET_VISIBILITY_TASK: {
      let newState = state.map((item) => {
        if (item.id === action.id) {
          item.visibility = action.visibility;
        }
        return item;
      });
      return newState;
    }
    case DELETE_LIST: {
      let newState = state.filter((item) => item.listId !== action.listId);
      return newState;
    }
    case DELETE_BOARD: {
      if (!action.listsId) {
        return [...state];
      }
      let newState = state.filter((item) => !action.listsId.includes(item.listId));
      return newState;
    }
    case SET_TASKS: {
      if (!action.state) {
        return state;
      }
      let newState = action.state.map((el) => {
        el.visibility = true;
        return el;
      });
      newState.sort((a, b) => a.order - b.order);
      return newState;
    }
    case CREATE_DESCRIPTION: {
      let newState = action.state.map((item) => {
        if (item.id !== action.id) {
          item.description = action.description;
        }
        return item;
      });
      return newState;
    }
    case DELETE_DESCRIPTION: {
      let newState = action.state.map((item) => {
        if (action.id !== item.id) {
          item.description = "";
        }
        return item;
      });
      return newState;
    }
    default:
      return state;
  }
};
export const onSettedTasks = (state) => {
  return { type: SET_TASKS, state };
};
export const onSettedVisibilityTask = ({ id, visibility }) => {
  return { type: SET_VISIBILITY_TASK, id, visibility };
};

export const onUpdatedTasks = ({ id, order, listId }) => {
  return { type: UPDATE_TASK, id, order, listId };
};

export const onCreatedTask = ({ name, listId, order, id }) => {
  return { type: CREATE_TASK, name, listId, order, id };
};

export const onDeletedTask = ({ id }) => {
  return { type: DELETE_TASK, id };
};
export const createDescription = (state, description, id) => {
  return {
    type: CREATE_DESCRIPTION,
    state,
    description,
    id,
  };
};
export const deleteDescription = (state, id) => {
  return {
    type: DELETE_DESCRIPTION,
    state,
    id,
  };
};

export const getTasks = ({ boardId }) => async (dispatch) => {
  const tasks = await api.getRequestAuth("tasks/getCurrentTasks", { boardId });
  dispatch(onSettedTasks(tasks.payload));
};

export const createTask = ({ name, listId }) => async (dispatch, getState) => {
  let id = uuid();
  let currentTasks = getState().tasks.filter((item) => item.listId === listId);
  let lastCurrentTask = currentTasks.reverse().find((item) => item.listId);
  let order = lastCurrentTask ? lastCurrentTask.order + stepOrder : 0;
  dispatch(onCreatedTask({ name, listId, order, id }));
  const result = await api.postRequestAuth("tasks/createTask", { listId, name, order });
  if (!result.status) {
    dispatch(onDeletedTask({ id }));
  }
};

export const deleteTask = ({ id }) => async (dispatch) => {
  dispatch(onSettedVisibilityTask({ id, visibility: false }));
  const result = await api.deleteRequestAuth("tasks/deleteTask", { id });
  if (!result.status) {
    dispatch(onSettedVisibilityTask({ id, visibility: true }));
  } else {
    dispatch(onDeletedTask({ id }));
  }
};

export const updateTasks = ({ id, order, listId }) => async (dispatch, getState) => {
  let task = getState().tasks.find((el) => el.id === id);
  let oldListId = task.listId;
  let oldOrder = task.order;
  dispatch(onUpdatedTasks({ id, order, listId }));
  const result = await api.putRequestAuth("tasks/updateTask", { id, order, listId });
  if (!result.status) {
    dispatch(onUpdatedTasks({ id, order: oldOrder, listId: oldListId }));
  }
};

export default TaskReducer;
