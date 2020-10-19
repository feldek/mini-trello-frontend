import { ON_DELETED_BOARD, ON_DELETED_LIST } from "./Actions/ListActions";
import {
  ON_CREATED_DESCRIPTION,
  ON_CREATED_TASK,
  ON_DELETED_DESCRIPTION,
  ON_DELETED_TASK,
  ON_SETTED_TASKS,
  ON_SETTED_VISIBILITY_TASK,
  ON_UPDATED_TASK,
} from "./Actions/TaskActions";

let initialState = {
  data: [],
  isFetching: false,
};
const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_CREATED_TASK: {
      let newData = [...state.data];
      newData.push({
        name: action.name,
        description: "",
        id: action.id,
        order: action.order,
        listId: action.listId,
        visibility: true,
      });
      return { ...state, data: newData };
    }
    case ON_UPDATED_TASK: {
      let newData = state.data.filter((el) => {
        if (el.id === action.id) {
          el.listId = action.listId;
          el.order = action.order;
        }
        return el;
      });
      newData.sort((a, b) => a.order - b.order);
      return { ...state, data: newData };
    }
    case ON_DELETED_TASK: {
      let newData = state.data.filter((item) => item.id !== action.id);
      return { ...state, data: newData };
    }
    case ON_SETTED_VISIBILITY_TASK: {
      let newData = state.data.map((item) => {
        if (item.id === action.id) {
          item.visibility = action.visibility;
        }
        return item;
      });
      return { ...state, data: newData };
    }
    case ON_DELETED_LIST: {
      let newData = state.data.filter((item) => item.listId !== action.listId);
      return { ...state, data: newData };
    }
    case ON_DELETED_BOARD: {
      if (!action.listsId) {
        return state;
      }
      let newData = state.data.filter((item) => !action.listsId.includes(item.listId));
      return { ...state, data: newData };
    }
    case ON_SETTED_TASKS: {
      if (!action.data) {
        return state;
      }
      let newData = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      newData.sort((a, b) => a.order - b.order);
      return { ...state, data: newData };
    }
    case ON_CREATED_DESCRIPTION: {
      let newData = state.data.map((item) => {
        if (item.id !== action.id) {
          item.description = action.description;
        }
        return item;
      });
      return { ...state, data: newData };
    }
    case ON_DELETED_DESCRIPTION: {
      let newData = state.data.map((item) => {
        if (action.id !== item.id) {
          item.description = "";
        }
        return item;
      });
      return { ...state, data: newData };
    }
    default:
      return state;
  }
};

export default TaskReducer;
