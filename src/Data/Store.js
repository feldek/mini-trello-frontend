import { combineReducers, createStore } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import TaskReducer from "./TaskReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

let reducers = combineReducers({
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
});

// let store = createStore(reducers);
// export default store;
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
// window.store = JSON.parse(window.localStorage.getItem("persist:root"));
