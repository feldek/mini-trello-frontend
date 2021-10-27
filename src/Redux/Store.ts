import { combineReducers, Action } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import BoardReduser from "./Board/BoardReducer";
import ListReduser from "./List/ListReducer";
import TaskReducer from "./Task/TaskReducer";
import { UserReducer } from "./User/UserSlice";

import LocationReduser from "./Location/LocationReducer";
import WeatherReduser from "./Weather/WeatherReducer";
import { configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  user: UserReducer,
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,
  location: LocationReduser,
  weather: WeatherReduser,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
});
export type IState = ReturnType<typeof reducers>;

export type RootStateType = ReturnType<typeof reducers>;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  RootStateType,
  unknown,
  A
>;
