import { combineReducers, createStore, applyMiddleware } from "redux";
import BoardReduser from "./Board/BoardReducer";
import ListReduser from "./List/ListReducer";
import TaskReducer from "./Task/TaskReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./User/UserReducer";
import createSagaMiddleware from "redux-saga";
import { listSaga } from "./List/ListSaga";
import { boardSaga } from "./Board/BoardSaga";
import { all, fork } from "redux-saga/effects";
import LocationReduser from "./Location/LocationReducer";
import WeatherReduser from "./Weather/WeatherReducer";

const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  user: UserReducer,
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
  location: LocationReduser,
  weather: WeatherReduser,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
);
export const persistor = persistStore(store);

export const rootSaga = function* rootSaga() {  
  yield all([fork(boardSaga), fork(listSaga)]);
};

sagaMiddleware.run(rootSaga);

export type RootStateType = ReturnType<typeof reducers>;
