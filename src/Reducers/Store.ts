import { combineReducers, createStore, applyMiddleware } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import TaskReducer from "./TaskReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./UserReducer";
import createSagaMiddleware from "redux-saga";
import boardSaga from "./Sagas/BoardSaga";
import { all } from "redux-saga/effects";
import listSaga from "./Sagas/ListSaga";
import LocationReduser from "./LocationReducer";
import WeatherReduser from "./WeatherReducer";


const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
  user: UserReducer,
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
  location: LocationReduser,
  weather: WeatherReduser,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
);
export let persistor = persistStore(store);

export default function* rootSaga() {
  yield all([boardSaga(),listSaga()]);
}

sagaMiddleware.run(rootSaga);

export type RootStateType = ReturnType<typeof reducers>;


