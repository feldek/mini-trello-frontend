import {
  GetWeatherType,
  ThunkWeatherType,
  onSetIsFenchingType,
  onSetUpdateDateType,
  onSetWeatherType,
} from "./WeatherTypes";
import { getLocation } from "../Location/LocationActions";
import { api } from "../../Api/Api";

export const ON_SET_WEATHER = "ON_SET_WEATHER";
export const ON_CLEAR_WEATHER = "ON_CLEAR_WEATHER";
export const ON_SET_IS_FETCHING_WEATHER = "ON_SET_IS_FETCHING_WEATHER";
export const ON_SET_UPDATE_DATE = "ON_SET_UPDATE_DATE";

export const onSetIsFenching = (isFetching: boolean): onSetIsFenchingType => {
  return { type: ON_SET_IS_FETCHING_WEATHER, isFetching };
};
export const onSetUpdateDate = (previousUpdateTime: number): onSetUpdateDateType => {
  return { type: ON_SET_UPDATE_DATE, previousUpdateTime };
};

export const onSetWeather = ({
  weatherDescription,
  temp,
  feels_like,
  temp_min,
  temp_max,
  pressure,
  windSpeed,
  sity,
  icon,
}: GetWeatherType): onSetWeatherType => {
  return {
    type: ON_SET_WEATHER,
    weatherDescription,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    windSpeed,
    sity,
    icon,
  };
};

export const getWeather = (requestInterval = 0): ThunkWeatherType => {
  return async (dispatch, getState) => {
    try {
      const previousUpdateTime = getState().weather.previousUpdateTime;
      const currentTime = new Date().getTime();
      if (!previousUpdateTime || currentTime - previousUpdateTime > requestInterval) {
        dispatch(onSetIsFenching(true));
        dispatch(onSetUpdateDate(currentTime));
        await dispatch(getLocation());
        const locationState = getState().location;
        if (locationState.latitude === null || locationState.longitude === null) {
          throw new Error();
        }
        const weatherData = await api.getRequestAuth<{ status: boolean; payload: any }>("api/weatherplugin", {
          lat: locationState.latitude,
          lon: locationState.longitude,
        });
        const data = weatherData.payload;
        dispatch(
          onSetWeather({
            weatherDescription: data.weather[0].description,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            sity: data.name,
            icon: data.weather[0].icon,
          })
        );
        dispatch(onSetIsFenching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
