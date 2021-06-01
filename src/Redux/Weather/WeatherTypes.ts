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

export type InitialWeatherType = {
  data: GetWeatherType;
  isFetching: boolean;
  previousUpdateTime: null | number;
};

export const GET_WEATHER = "ON_GET_WEATHER";
export const ON_SET_WEATHER = "ON_SET_WEATHER";
export const ON_CLEAR_WEATHER = "ON_CLEAR_WEATHER";
export const ON_SET_IS_FETCHING_WEATHER = "ON_SET_IS_FETCHING_WEATHER";
export const ON_SET_UPDATE_DATE = "ON_SET_UPDATE_DATE";

type onClearWeather = { type: typeof ON_CLEAR_WEATHER };
export type onSetIsFenchingType = {
  type: typeof ON_SET_IS_FETCHING_WEATHER;
  isFetching: boolean;
};
export type onSetUpdateDateType = {
  type: typeof ON_SET_UPDATE_DATE;
  previousUpdateTime: number;
};
export type onGetWeatherType = {
  type: typeof GET_WEATHER;
  requestInterval: number;
};
export type onSetWeatherType = GetWeatherType & { type: typeof ON_SET_WEATHER };

export type ApiGetWeatherType = {
  weather: { description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  wind: { speed: number };
  name: string;
};

export type ActionsWeatherType = onSetWeatherType | onSetIsFenchingType | onSetUpdateDateType | onClearWeather;
export type ThunkWeatherType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsWeatherType>;
