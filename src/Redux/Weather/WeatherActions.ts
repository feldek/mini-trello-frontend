import { WeatherType, WeatherThunkType, weatherConsts } from "./WeatherTypes";
import { getLocation } from "../Location/LocationActions";
import { api } from "../../Api/Api";

export const weatherActions = {
  onSetIsFenching: (isFetching: boolean) =>
    ({ type: weatherConsts.ON_SET_IS_FETCHING_WEATHER, payload: { isFetching } } as const),
  onSetUpdateDate: (previousUpdateTime: number) =>
    ({ type: weatherConsts.ON_SET_UPDATE_DATE, payload: { previousUpdateTime } } as const),
  onSetWeather: (data: WeatherType) => ({ type: weatherConsts.ON_SET_WEATHER, payload: { ...data } } as const),
  getWeatherSaga: (requestInterval = 0) =>
    ({ type: weatherConsts.GET_WEATHER, payload: { requestInterval } } as const),
};

export const getWeather = (requestInterval = 0): WeatherThunkType => {
  return async (dispatch, getState) => {
    try {
      const { previousUpdateTime } = getState().weather;
      const currentTime = new Date().getTime();
      if (!previousUpdateTime || currentTime - previousUpdateTime > requestInterval) {
        dispatch(weatherActions.onSetIsFenching(true));
        dispatch(weatherActions.onSetUpdateDate(currentTime));
        await dispatch(getLocation());
        const locationState = getState().location;
        if (locationState.latitude === null || locationState.longitude === null) {
          throw new Error();
        }
        const { payload } = await api.getRequestAuth<{ status: boolean; payload: any }>("api/weatherplugin", {
          lat: locationState.latitude,
          lon: locationState.longitude,
        });

        dispatch(
          weatherActions.onSetWeather({
            weatherDescription: payload.weather[0].description,
            temp: payload.main.temp,
            feels_like: payload.main.feels_like,
            temp_min: payload.main.temp_min,
            temp_max: payload.main.temp_max,
            pressure: payload.main.pressure,
            windSpeed: payload.wind.speed,
            sity: payload.name,
            icon: payload.weather[0].icon,
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(weatherActions.onSetIsFenching(false));
    }
  };
};
