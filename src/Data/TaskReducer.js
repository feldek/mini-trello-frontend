import { uuid } from "uuidv4";

const CREATE_TASK = "CREATE_TASK";
const SET_TASK_STATE = "SET_TASK_STATE";
const DELETE_TASK = "DELETE_TASK";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";
const CREATE_DESCRIPTION = "CREATE_DESCRIPTION";
const DELETE_DESCRIPTION = "DELETE_DESCRIPTION";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage ? localStorage.tasks : [];
const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK: {
      let newState = [...action.state];
      newState.push({
        id: uuid(),
        name: action.name,
        listId: action.listId,
        description: "",
      });
      return newState;
    }
    case SET_TASK_STATE: {
      let listsId = action.state.map((task) => task.listId);
      listsId.push(action.oldlist);
      let newState = state.filter((task) => !listsId.includes(task.listId));
      return [...newState, ...action.state];
    }
    case DELETE_TASK: {
      let newState = action.state.filter((item) => item.id !== action.id);
      return newState;
    }
    case DELETE_LIST: {
      let newState = action.stateTask.filter(
        (item) => item.listId !== action.listId
      );
      return newState;
    }
    case DELETE_BOARD: {
      let newState = action.stateTask.filter(
        (item) => !action.listsId.includes(item.listId)
      );
      return newState;
    }
    case CREATE_DESCRIPTION: {
      let newState = action.state.map((item) =>
        item.id !== action.id
          ? item
          : {
              id: item.id,
              name: item.name,
              listId: item.listId,
              description: action.description,
            }
      );
      return newState;
    }
    case DELETE_DESCRIPTION: {
      let newState = action.state.map((item) =>
        action.id !== item.id
          ? item
          : {
              id: item.id,
              name: item.name,
              listId: item.listId,
              description: "",
            }
      );
      return newState;
    }
    default:
      return state;
  }
};

export const setTaskState = (state, oldlist) => {
  return { type: SET_TASK_STATE, state, oldlist };
};
export const createTask = (state, name, listId) => {
  return { type: CREATE_TASK, state, name, listId };
};
export const deleteTask = (state, id) => {
  return { type: DELETE_TASK, state, id };
};
export const createDescription = (state, description, id) => {
  return {
    type: CREATE_DESCRIPTION,
    state,
    description,
    id,
  };
};
export const deleteDescription = (state,id) => {
  return {
    type: DELETE_DESCRIPTION,
    state,
    id,
  };
};

export default TaskReducer;
