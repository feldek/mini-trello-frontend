import { uuid } from "uuidv4";

const CREATE_EMPTY_TASK = "CREATE_EMPTY_TASK";
const SET_TASK_STATE = "SET_TASK_STATE";
const DELETE_TASK = "DELETE_TASK";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";


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
      let stateCopy = state.filter(
        (el) => !action.listsId.includes(el[0].listId)
      );
      return [...stateCopy, ...action.stateArr];
    }
    case DELETE_TASK: {
      let stateCopy = state.map((item) =>
        item[0].listId !== action.listId
          ? item
          : item.filter((el) => action.taskId !== el.id)
      );
      return stateCopy;
    }
    case DELETE_LIST: {
      let stateCopy = state.filter((item) => item[0].listId !== action.listId);
      return stateCopy;
    }
    case DELETE_BOARD: {
      debugger
      let stateCopy = state.filter(
        (item) => !action.listsId.includes(item[0].listId)
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
export const setTaskState = (stateArr, listsId) => {
  return { type: SET_TASK_STATE, stateArr, listsId };
};
export const deleteTask = (taskId, listId) => {
  return { type: DELETE_TASK, taskId, listId };
};
export default TaskReducer;
