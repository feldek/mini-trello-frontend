import { ON_CLEAR_WEATHER, ON_SET_IS_FETCHING_WEATHER, ON_SET_UPDATE_DATE, ON_SET_WEATHER } from "./WeatherActions";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../Store";

export type GetWeatherType = {
  weatherDescription: string;
  temp: null | number;
  feels_like: null | number;
  temp_min: null | number;
  temp_max: null | number;
  pressure: null | number;
  windSpeed: null | number;
  sity: string;
  icon: string;
};

export type InitialStateType = {
  data: GetWeatherType;
  isFetching: boolean;
  previousUpdateTime: null | number;
};

type onClearWeather = { type: typeof ON_CLEAR_WEATHER };
export type onSetIsFenchingType = {
  type: typeof ON_SET_IS_FETCHING_WEATHER;
  isFetching: boolean;
};
export type onSetUpdateDateType = {
  type: typeof ON_SET_UPDATE_DATE;
  previousUpdateTime: number;
};
export type onSetWeatherType = GetWeatherType & { type: typeof ON_SET_WEATHER };

export type ActionsWeatherType = onSetWeatherType | onSetIsFenchingType | onSetUpdateDateType | onClearWeather;
export type ThunkWeatherType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsWeatherType>;
