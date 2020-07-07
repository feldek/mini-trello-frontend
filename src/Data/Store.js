import { combineReducers, createStore } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import TaskReducer from "./TaskReducer";
import DescriptionReduser from "./DescriptionReducer";

let reducers = combineReducers({
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
  descriptions: DescriptionReduser,
});

let store = createStore(reducers);
export default store;
window.store = store;
