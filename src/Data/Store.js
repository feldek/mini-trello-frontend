import { combineReducers, createStore } from "redux";
import BoardReduser from "./BoardReducer";


let reducers = combineReducers({
  board: BoardReduser,
  // validation: ValidationReducer,
});

let store = createStore(reducers);

export default store;

window.store = store;