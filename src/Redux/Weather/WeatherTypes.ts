import { BaseThunkType, InferActionsTypes } from "../Store";
import { weatherActions } from "./WeatherActions";

export type WeatherType = {
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
  data: WeatherType;
  isFetching: boolean;
  previousUpdateTime: null | number;
};

export const weatherConsts = {
  ON_SET_WEATHER: "ON_SET_WEATHER",
  ON_SET_IS_FETCHING_WEATHER: "ON_SET_IS_FETCHING_WEATHER",
  ON_SET_UPDATE_DATE: "ON_SET_UPDATE_DATE",

  GET_WEATHER_SAGA: "ON_GET_WEATHER_SAGA",
} as const;

export type WeatherActionsType = InferActionsTypes<typeof weatherActions>;
export type WeatherThunkType = BaseThunkType<WeatherActionsType>;

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

export type onGetWeatherSagaType = {
  type: typeof weatherConsts.GET_WEATHER_SAGA;
  payload: {
    requestInterval: number;
  };
};
