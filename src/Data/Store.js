import { combineReducers, createStore } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import CaseReducer from "./CaseReducer";

// import BoardReduserOld from "./BoardReducerOld";



let reducers = combineReducers({
  // board: BoardReduserOld,
  boards: BoardReduser,
  lists: ListReduser,
  cases: CaseReducer,

  // validation: ValidationReducer,
});

let store = createStore(reducers);

export default store;

window.store = store;