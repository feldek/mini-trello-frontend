import { combineReducers, createStore } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import CaseReducer from "./CaseReducer";

let reducers = combineReducers({
  boards: BoardReduser,
  lists: ListReduser,
  cases: CaseReducer,
});

let store = createStore(reducers);
export default store;
window.store = store;
