import { combineReducers, createStore } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import TaskReducer from "./TaskReducer";

let reducers = combineReducers({
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
});

let store = createStore(reducers);
export default store;
window.store = store;
