const CREATE_DESCRIPTION = "CREATE_DESCRIPTION";
const DELETE_DESCRIPTION = "DELETE_DESCRIPTION";
const DELETE_TASK = "DELETE_TASK";
const DELETE_LIST = "DELETE_LIST";
const DELETE_BOARD = "DELETE_BOARD";

const DescriptionReduser = (
  state = JSON.parse(window.localStorage.getItem("dataUserDescription")),
  action
) => {
  switch (action.type) {
    case CREATE_DESCRIPTION: {
      let stateCopy = !state ? [] : [...state];
      if (stateCopy.length === 0) {
        stateCopy.push({
          taskId: action.taskId,
          name: action.name,
        });
      } else if (stateCopy.find((el) => el.taskId === action.taskId)) {
        stateCopy = stateCopy.map((item) =>
          item.taskId === action.taskId
            ? { taskId: action.taskId, name: action.name }
            : { taskId: action.taskId, name: item.name }
        );
      } else {
        stateCopy.push({
          taskId: action.taskId,
          name: action.name,
        });
      }
      return stateCopy;
    }
    case DELETE_DESCRIPTION: {
      if (!state) return state;
      let stateCopy = state.filter((el) => el.taskId !== action.taskId);
      return stateCopy;
    }
    case DELETE_TASK: {
      if (!state) return state;
      let stateCopy = state.filter((el) => el.taskId !== action.taskId);
      return stateCopy;
    }
    case DELETE_LIST: {
      if (!state) return state;
      let stateCopy = state.filter((el) => !action.tasksId.includes(el.taskId));
      return stateCopy;
    }
    case DELETE_BOARD: {
      if (!state) return state;
      let stateCopy = state.filter((el) => !action.tasksId.includes(el.taskId));
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createDescription = (name, taskId) => {
  return {
    type: CREATE_DESCRIPTION,
    name,
    taskId,
  };
};
export const deleteDescription = (taskId) => {
  return {
    type: DELETE_DESCRIPTION,
    taskId,
  };
};

export default DescriptionReduser;
