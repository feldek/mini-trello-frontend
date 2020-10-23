import { uuid } from "uuidv4";
import { api } from "../../Api/Api";

export const ON_CREATE_TASK = "ON_CREATE_TASK";
export const ON_UPDATE_TASK = "ON_UPDATE_TASK";
export const ON_SET_TASKS = "ON_SET_TASKS";
export const ON_DELETE_TASK = "ON_DELETE_TASK";
export const ON_UPDATE_DESCRIPTION = "ON_UPDATE_DESCRIPTION";
// export const ON_DELETE_DESCRIPTION = "ON_DELETE_DESCRIPTION";
export const ON_SET_VISIBILITY_TASK = "ON_SET_VISIBILITY_TASK";
export const stepOrder = 100000;

export const onUpdateDescriptionStart = ({ description, id }) => {
  return { type: ON_UPDATE_DESCRIPTION, description, id };
};
export const onUpdateDescriptionError = ({ description, id }) => {
  return { type: ON_UPDATE_DESCRIPTION, description, id };
};
export const updateDescription = ({ id, description }) => async (dispatch, getState) => {
  let oldDescription = getState().tasks.data.find((el) => (el.id = id));
  dispatch(onUpdateDescriptionStart({ description: oldDescription, id }));
  const task = await api.postRequestAuth("tasks/updateDescription", { id, description });
  if (!task.status) {
    onUpdateDescriptionError({ id, description: oldDescription });
  }  
};
// export const deleteDescription = (state, id) => {
//   return { type: ON_DELETE_DESCRIPTION, state, id };
// };

export const onSetTasks = (data) => {
  return { type: ON_SET_TASKS, data };
};
export const getTasks = ({ boardId }) => async (dispatch) => {
  const tasks = await api.getRequestAuth("tasks/getCurrentTasks", { boardId });
  dispatch(onSetTasks(tasks.payload));
};

export const onCreateTaskStart = ({ name, listId, order, id }) => {
  return { type: ON_CREATE_TASK, name, listId, order, id };
};
export const onCreateTaskError = ({ id }) => {
  return { type: ON_DELETE_TASK, id };
};
export const createTask = ({ name, listId }) => async (dispatch, getState) => {
  let id = uuid();
  let currentTasks = getState().tasks.data.filter((item) => item.listId === listId);
  let lastCurrentTask = currentTasks.reverse().find((item) => item.listId);
  let order = lastCurrentTask ? lastCurrentTask.order + stepOrder : 0;
  dispatch(onCreateTaskStart({ name, listId, order, id }));
  const result = await api.postRequestAuth("tasks/createTask", { listId, name, order });
  if (!result.status) {
    dispatch(onCreateTaskError({ id }));
  }
};

export const onDeleteTaskStart = ({ id }) => {
  return { type: ON_SET_VISIBILITY_TASK, id, visibility: false };
};
export const onDeleteTaskError = ({ id }) => {
  return { type: ON_SET_VISIBILITY_TASK, id, visibility: true };
};
export const onDeleteTaskSuccess = ({ id }) => {
  return { type: ON_DELETE_TASK, id };
};
export const deleteTask = ({ id }) => async (dispatch) => {
  dispatch(onDeleteTaskStart({ id }));
  const result = await api.deleteRequestAuth("tasks/deleteTask", { id });
  if (!result.status) {
    dispatch(onDeleteTaskError({ id }));
  } else {
    dispatch(onDeleteTaskSuccess({ id }));
  }
};

export const onUpdateTaskStart = ({ id, order, listId }) => {
  return { type: ON_UPDATE_TASK, id, order, listId };
};
export const onUpdateTaskError = ({ id, order, listId }) => {
  return { type: ON_UPDATE_TASK, id, order, listId };
};
export const updateTask = ({ id, order, listId }) => async (dispatch, getState) => {
  let task = getState().tasks.data.find((el) => el.id === id);
  let oldListId = task.listId;
  let oldOrder = task.order;
  dispatch(onUpdateTaskStart({ id, order, listId }));
  const result = await api.putRequestAuth("tasks/updateTask", { id, order, listId });
  if (!result.status) {
    dispatch(onUpdateTaskError({ id, order: oldOrder, listId: oldListId }));
  }
};
