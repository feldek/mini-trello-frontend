import { ON_CLEAR_DATA } from "./Actions/BoardActions";
import { ON_DELETE_BOARD, ON_DELETE_LIST } from "./Actions/ListActions";
import {
  ON_UPDATE_DESCRIPTION,
  ON_CREATE_TASK,
  ON_DELETE_TASK,
  ON_SET_TASKS,
  ON_SET_VISIBILITY_TASK,
  ON_UPDATE_TASK,
  ON_CREATE_TASKS,
} from "./Actions/TaskActions";

let initialState = {
  data: [],
  isFetching: false,
};
const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_CREATE_TASK: {
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
    case ON_CREATE_TASKS: {
      let newData = [...state.data];
      action.data = action.data.map((el) => {
        el.visibility = true;
        return el;
      });
      newData.push(...action.data);
      return { ...state, data: newData };
    }
    case ON_UPDATE_TASK: {
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
    case ON_DELETE_TASK: {
      let newData = state.data.filter((item) => item.id !== action.id);
      return { ...state, data: newData };
    }
    case ON_SET_VISIBILITY_TASK: {
      let newData = state.data.map((item) => {
        if (item.id === action.id) {
          item.visibility = action.visibility;
        }
        return item;
      });
      return { ...state, data: newData };
    }
    case ON_DELETE_LIST: {
      let newData = state.data.filter((item) => item.listId !== action.listId);
      return { ...state, data: newData };
    }
    case ON_DELETE_BOARD: {
      if (!action.listsId) {
        return state;
      }
      let newData = state.data.filter((item) => !action.listsId.includes(item.listId));
      return { ...state, data: newData };
    }
    case ON_SET_TASKS: {
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
    case ON_UPDATE_DESCRIPTION: {
      let newData = state.data.map((item) => {
        if (item.id === action.id) {
          item.description = action.description;
        }
        return item;
      });
      return { ...state, data: newData };
    }
    case ON_CLEAR_DATA: {
      return { ...state, data: action.payload.newData };
    }
    default:
      return state;
  }
};

export default TaskReducer;
