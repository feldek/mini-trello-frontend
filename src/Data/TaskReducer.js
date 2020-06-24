import { uuid } from "uuidv4";

const CREATE_EMPTY_TASK = "CREATE_EMPTY_TASK";
const SET_TASK_STATE = "SET_TASK_STATE";
const DELETE_TASK_LIST = "DELETE_TASK_LIST";
const DELETE_TASK_BOARD = "DELETE_TASK_BOARD";

const TaskReducer = (
  state = JSON.parse(window.localStorage.getItem("dataUserTask")),
  action
) => {
  switch (action.type) {
    case CREATE_EMPTY_TASK: {
      let stateCopy = !state ? [] : [...state];
      stateCopy.push([{ id: uuid(), name: "", listId: action.listId }]);
      return stateCopy;
    }
    case SET_TASK_STATE: {
      return [...action.stateArr];
    }
    case DELETE_TASK_LIST: {
      let stateCopy = [...state];
      stateCopy.splice(action.ind, 1);
      return stateCopy;
    }
    case DELETE_TASK_BOARD: {
      let stateCopy = state.filter(
        (item) => !action.listId.includes(item[0].listId)
      );
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createEmptyTask = (listId) => {
  return { type: CREATE_EMPTY_TASK, listId };
};
export const setTaskState = (stateArr) => {
  return { type: SET_TASK_STATE, stateArr };
};
export const deleteTaskList = (ind) => {
  return { type: DELETE_TASK_LIST, ind };
};
export const deleteTaskBoard = (listId) => {
  return { type: DELETE_TASK_LIST, listId };
};

export default TaskReducer;
