import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { weatherSaga } from "./Weather/WeatherSagas";
import BoardReduser from "./Board/BoardReducer";
import ListReduser from "./List/ListReducer";
import TaskReducer from "./Task/TaskReducer";
import UserReducer from "./User/UserReducer";
import { listSaga } from "./List/ListSagas";
import { boardSaga } from "./Board/BoardSagas";
import LocationReduser from "./Location/LocationReducer";
import WeatherReduser from "./Weather/WeatherReducer";
import { locationSaga } from "./Location/LocationSagas";

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

export const rootSaga = function* rootSaga(): any {
  yield all([fork(boardSaga), fork(listSaga), fork(locationSaga), fork(weatherSaga)]);
};

sagaMiddleware.run(rootSaga);

export type RootStateType = ReturnType<typeof reducers>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootStateType, unknown, A>;
