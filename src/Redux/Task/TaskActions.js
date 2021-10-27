import { uuid } from "uuidv4"
import { api } from "../../Api/Api"

export const ON_CREATE_TASK = "ON_CREATE_TASK"
export const ON_CREATE_TASKS = "ON_CREATE_TASKS"
export const ON_UPDATE_TASK = "ON_UPDATE_TASK"
export const ON_SET_TASKS = "ON_SET_TASKS"
export const ON_DELETE_TASK = "ON_DELETE_TASK"
export const ON_UPDATE_DESCRIPTION = "ON_UPDATE_DESCRIPTION"
export const ON_SET_VISIBILITY_TASK = "ON_SET_VISIBILITY_TASK"
export const stepOrder = 100000

export const onUpdateDescriptionStart = ({ description, id }) => ({
 type: ON_UPDATE_DESCRIPTION,
 description,
 id,
})
export const onUpdateDescriptionError = ({ description, id }) => ({
 type: ON_UPDATE_DESCRIPTION,
 description,
 id,
})
export const updateDescription =
 ({ id, description }) =>
 async (dispatch, getState) => {
  const oldDescription = getState().tasks.data.find((el) => el.id === id)
  dispatch(onUpdateDescriptionStart({ description, id }))
  const task = await api.patchRequestAuth("task", { id, description })
  if (!task.status) {
   onUpdateDescriptionError({ id, description: oldDescription })
  }
 }

export const onSetTasks = (data) => ({ type: ON_SET_TASKS, data })
export const getTasks =
 ({ boardId }) =>
 async (dispatch) => {
  const tasks = await api.getRequestAuth("tasks", { boardId })
  if (tasks.status) {
   dispatch(onSetTasks(tasks.payload))
  }
 }

export const onCreateTasks = (data = []) => ({ type: ON_CREATE_TASKS, data })

export const createTasks =
 (data = []) =>
 async (dispatch) => {
  const result = await api.postRequestAuth("tasks", { tasks: data })
  if (result.status) {
   dispatch(onCreateTasks(data))
  }
  return result
 }
export const onCreateTaskStart = ({ name, listId, order, id }) => ({
 type: ON_CREATE_TASK,
 name,
 listId,
 order,
 id,
})
export const onCreateTaskError = ({ id }) => ({ type: ON_DELETE_TASK, id })
export const createTask =
 ({ name, listId }) =>
 async (dispatch, getState) => {
  const id = uuid()
  const currentTasks = getState().tasks.data.filter((item) => item.listId === listId)
  const lastCurrentTask = currentTasks.reverse().find((item) => item.listId)
  const order = lastCurrentTask ? lastCurrentTask.order + stepOrder : 0
  dispatch(onCreateTaskStart({ name, listId, order, id }))
  const result = await api.postRequestAuth("tasks", {
   tasks: [{ listId, name, order, id }],
  })
  if (!result.status) {
   dispatch(onCreateTaskError({ id }))
  }
 }

export const onDeleteTaskStart = ({ id }) => ({
 type: ON_SET_VISIBILITY_TASK,
 id,
 visibility: false,
})
export const onDeleteTaskError = ({ id }) => ({
 type: ON_SET_VISIBILITY_TASK,
 id,
 visibility: true,
})
export const onDeleteTaskSuccess = ({ id }) => ({ type: ON_DELETE_TASK, id })
export const deleteTask =
 ({ id }) =>
 async (dispatch) => {
  dispatch(onDeleteTaskStart({ id }))
  const result = await api.deleteRequestAuth("task", { id })
  if (!result.status) {
   dispatch(onDeleteTaskError({ id }))
  } else {
   dispatch(onDeleteTaskSuccess({ id }))
  }
 }

export const onUpdateTaskStart = ({ id, order, listId }) => ({
 type: ON_UPDATE_TASK,
 id,
 order,
 listId,
})
export const onUpdateTaskError = ({ id, order, listId }) => ({
 type: ON_UPDATE_TASK,
 id,
 order,
 listId,
})
export const updateTask = ({ id, order, listId }) => async (dispatch, getState) => {
  const task = getState().tasks.data.find((el) => el.id === id)
  const oldListId = task.listId
  const oldOrder = task.order
  dispatch(onUpdateTaskStart({ id, order, listId }))
  const result = await api.patchRequestAuth("task", { id, order, listId })
  if (!result.status) {
   dispatch(onUpdateTaskError({ id, order: oldOrder, listId: oldListId }))
  }
 }
