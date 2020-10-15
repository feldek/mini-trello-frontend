import { api } from "../Api/Api";
export const stepOrder = 100000;
const CREATE_TASK = "CREATE_TASK";
const UPDATE_TASKS = "UPDATE_TASKS";
const INIT_TASKS = "INIT_TASKS";
const UPDATE_ORDER = "UPDATE_ORDER";
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
        name: action.name,
        description: "",
        id: action.id,
        order: action.order,
        listId: action.listId,
      });
      return newState;
    }
    case UPDATE_TASKS: {
      if (action.oldListId === "oneList") return [...action.state];
      let listsId = action.state.map((task) => task.listId);
      listsId = listsId.filter((item, index) => listsId.indexOf(item) === index);
      listsId.push(action.oldListId);
      let newState = state.filter((task) => !listsId.includes(task.listId));
      return [...newState, ...action.state];
    }
    case DELETE_TASK: {
      let newState = action.state.filter((item) => item.id !== action.id);
      return newState;
    }
    case DELETE_LIST: {
      let newState = action.stateTask.filter((item) => item.listId !== action.listId);
      return newState;
    }
    case DELETE_BOARD: {
      // debugger
      if(!action.listsId) return [...action.state]
      let newState = action.stateTask.filter(
        (item) => !action.listsId.includes(item.listId)
      );
      return newState;
    }
    case INIT_TASKS: {
      // let newState = [...action.state];
      let newState = action.state.sort((a, b) => a.order - b.order);
      // debugger
      return newState;
    }
    case UPDATE_ORDER: {
      // let newState = [...action.state];
      let newState = action.state.map(
        (el) =>
          (el =
            el.id === action.id
              ? {
                  name: el.name,
                  // description: el.description,
                  id: el.id,
                  order: action.order,
                  listId: action.listId,
                }
              : el)
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
export const initTasksLocal = (state) => {
  return { type: INIT_TASKS, state };
};

export const updateTasksLocal = (state, { oldListId }) => {
  return { type: UPDATE_TASKS, state, oldListId };
};

export const createTaskLocal = (state, { name, listId, order, id }) => {
  return { type: CREATE_TASK, state, name, listId, order, id };
};
export const updateOrderLocal = (state, { order, id, listId }) => {
  return { type: UPDATE_ORDER, state, order, id, listId };
};
export const deleteTaskLocal = (state, { id }) => {
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
export const deleteDescription = (state, id) => {
  return {
    type: DELETE_DESCRIPTION,
    state,
    id,
  };
};

export const getInitTasks = ({ boardId }) => (dispatch) => {
  return api.getRequest("tasks/getCurrentTasks", { boardId }).then(
    (result) => {
      dispatch(initTasksLocal(result));
      return result;
    },
    (error) => {
      console.log(error);
    }
  );
};

export const createTask = (state, { listId, name }) => (dispatch) => {
  let currentTasks = state.filter((item) => item.listId === listId);
  let lastCurrentTask = currentTasks.reverse().find((item) => item.listId);
  let order = lastCurrentTask ? lastCurrentTask.order + stepOrder : 0;
  return api.postRequest("tasks/createTask", { listId, name, order }).then(
    async (result) => {
      if (result.createdTask === true) {
        await dispatch(createTaskLocal(state, { name, id: result.id, listId, order }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const deleteTask = (state, { id }) => (dispatch) => {
  return api.deleteRequest("tasks/deleteTask", { id }).then(
    async (result) => {
      if (result.deletedTask === true) {
        await dispatch(deleteTaskLocal(state, { id }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};
export const updateOrder = (state, { id, order, listId }) => (dispatch) => {
  return api.putRequest("tasks/updateTask", { id, order, listId })
  .then(  
    // async (result) => {
    //   if (result.updatedTask === true) {
    //     await dispatch(updateOrderLocal(state, { id, order, listId }));
    //   }
    // },
    (error) => {
      console.log(error);
    }
  );
};

export default TaskReducer;
