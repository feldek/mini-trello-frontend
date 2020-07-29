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
      let stateCopy = [...state];
      stateCopy.push({
        id: uuid(),
        name: action.name,
        listId: action.listId,
        description: "",
      });
      return stateCopy;
    }
    case SET_TASK_STATE: {
      let listsId = action.state.map((task) => task.listId);
      listsId.push(action.oldlist);
      let stateCopy = state.filter((task) => !listsId.includes(task.listId));
      return [...stateCopy, ...action.state];
    }
    case DELETE_TASK: {
      let stateCopy = state.filter((item) => item.id !== action.id);
      return stateCopy;
    }
    case DELETE_LIST: {
      let stateCopy = state.filter((item) => item.listId !== action.listId);
      return stateCopy;
    }
    case DELETE_BOARD: {
      let stateCopy = state.filter(
        (item) => !action.listsId.includes(item.listId)
      );
      return stateCopy;
    }
    case CREATE_DESCRIPTION: {
      let stateCopy = state.map((item) =>
        item.id !== action.id
          ? item
          : {
              id: item.id,
              name: item.name,
              listId: item.listId,
              description: action.description,
            }
      );
      return stateCopy;
    }
    case DELETE_DESCRIPTION: {
      let stateCopy = state.map((item) =>
        action.id !== item.id
          ? item
          : {
              id: item.id,
              name: item.name,
              listId: item.listId,
              description: "",
            }
      );
      return stateCopy;
    }
    default:
      return state;
  }
};

export const setTaskState = (state, oldlist) => {
  return { type: SET_TASK_STATE, state, oldlist };
};
export const createTask = (name, listId) => {
  return { type: CREATE_TASK, name, listId };
};
export const deleteTask = (id) => {
  return { type: DELETE_TASK, id };
};
export const createDescription = (description, id) => {
  return {
    type: CREATE_DESCRIPTION,
    description,
    id,
  };
};
export const deleteDescription = (id) => {
  return {
    type: DELETE_DESCRIPTION,
    id,
  };
};

export default TaskReducer;
