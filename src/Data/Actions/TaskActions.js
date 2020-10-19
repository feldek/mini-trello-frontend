import { uuid } from "uuidv4";
import { api } from "../../Api/Api";

export const ON_CREATED_TASK = "CREATE_TASK";
export const ON_UPDATED_TASK = "UPDATE_TASK";
export const ON_SETTED_TASKS = "SET_TASKS";
export const ON_DELETED_TASK = "DELETE_TASK";
export const ON_DELETED_LIST = "DELETE_LIST";
export const ON_DELETED_BOARD = "DELETE_BOARD";
export const ON_CREATED_DESCRIPTION = "CREATE_DESCRIPTION";
export const ON_DELETED_DESCRIPTION = "DELETE_DESCRIPTION";
export const ON_SETTED_VISIBILITY_TASK = "SET_VISIBILITY_TASK";
export const stepOrder = 100000;

export const onSettedTasks = (data) => {
  return { type: ON_SETTED_TASKS, data };
};
export const onSettedVisibilityTask = ({ id, visibility }) => {
  return { type: ON_SETTED_VISIBILITY_TASK, id, visibility };
};

export const onUpdatedTasks = ({ id, order, listId }) => {
  return { type: ON_UPDATED_TASK, id, order, listId };
};

export const onCreatedTask = ({ name, listId, order, id }) => {
  return { type: ON_CREATED_TASK, name, listId, order, id };
};

export const onDeletedTask = ({ id }) => {
  return { type: ON_DELETED_TASK, id };
};
export const createDescription = (state, description, id) => {
  return {
    type: ON_CREATED_DESCRIPTION,
    state,
    description,
    id,
  };
};
export const deleteDescription = (state, id) => {
  return {
    type: ON_DELETED_DESCRIPTION,
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
  let currentTasks = getState().tasks.data.filter((item) => item.listId === listId);
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
  let task = getState().tasks.data.find((el) => el.id === id);
  let oldListId = task.listId;
  let oldOrder = task.order;
  dispatch(onUpdatedTasks({ id, order, listId }));
  const result = await api.putRequestAuth("tasks/updateTask", { id, order, listId });
  if (!result.status) {
    dispatch(onUpdatedTasks({ id, order: oldOrder, listId: oldListId }));
  }
};
