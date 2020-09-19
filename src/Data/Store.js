import { combineReducers, createStore, applyMiddleware } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import TaskReducer from "./TaskReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import DataUserReducer from "./DataUserReducer";

const persistConfig = {
  key: "root",
  storage,
};

let reducers = combineReducers({
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
  dataUser: DataUserReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export let persistor = persistStore(store);


