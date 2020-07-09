import { uuid } from "uuidv4";

const CREATE_LIST = "CREATE_LIST";
const SET_TASK_STATE = "SET_TASK_STATE";
const DELETE_TASK = "DELETE_TASK";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";
const CREATE_DESCRIPTION = "CREATE_DESCRIPTION";
const DELETE_DESCRIPTION = "DELETE_DESCRIPTION";

let localStorage = JSON.parse(window.localStorage.getItem("dataUserTask"));
let initialState = localStorage ? localStorage : [];
const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let stateCopy = [...state];
      stateCopy.push([
        { id: uuid(), name: "", listId: action.id, description: "" },
      ]);
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
      let stateCopy = state.filter(
        (item) => !action.listsId.includes(item[0].listId)
      );
      return stateCopy;
    }
    case CREATE_DESCRIPTION: {
      let stateCopy = state.map((el) =>
        el.map((item) =>
          item.id !== action.id
            ? item
            : {
                id: item.id,
                name: item.name,
                listId: item.listId,
                description: action.description,
              }
        )
      );
      return stateCopy;
    }
    case DELETE_DESCRIPTION: {
      let stateCopy = state.map((el) =>
        action.listId !== el[0].listId
          ? el
          : el.map((item) =>
              action.id !== item.id
                ? item
                : {
                    id: item.id,
                    name: item.name,
                    listId: item.listId,
                    description: "",
                  }
            )
      );
      return stateCopy;
    }
    default:
      return state;
  }
};

export const setTaskState = (stateArr, listsId) => {
  return { type: SET_TASK_STATE, stateArr, listsId };
};
export const deleteTask = (taskId, listId) => {
  return { type: DELETE_TASK, taskId, listId };
};
export const createDescription = (description, id) => {
  return {
    type: CREATE_DESCRIPTION,
    description,
    id,
  };
};
export const deleteDescription = (id, listId) => {
  return {
    type: DELETE_DESCRIPTION,
    id,
    listId,
  };
};

export default TaskReducer;
