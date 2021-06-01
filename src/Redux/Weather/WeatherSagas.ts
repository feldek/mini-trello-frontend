import { locationActions } from "./../Location/LocationActions";
import { put, all, takeLatest, select } from "redux-saga/effects";

import { ApiGetWeatherType , onGetWeatherSagaType, weatherConsts } from "./WeatherTypes";
import { weatherActions } from "./WeatherActions";
import { InitialLocationType } from "./../Location/LocationTypes";
import { api } from "../../Api/Api";

function* watchGetWeather(action: onGetWeatherSagaType) {
  try {
    const { requestInterval } = action.payload;
    const previousUpdateTime: number = yield select((s) => s.weather.previousUpdateTime);
    const currentTime = new Date().getTime();
    if (!previousUpdateTime || currentTime - previousUpdateTime > requestInterval) {
      yield put(weatherActions.onSetIsFenching(true));
      yield put(weatherActions.onSetUpdateDate(currentTime));
      yield put(locationActions.getLocationSaga());

      const locationState: InitialLocationType = yield select((s) => s.location);
      if (locationState.latitude === null || locationState.longitude === null) {
        throw new Error();
      }

      const { payload }: { payload: ApiGetWeatherType } = yield api.getRequestAuth("api/weatherplugin", {
        lat: locationState.latitude,
        lon: locationState.longitude,
      });
      yield put(
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
      yield put(weatherActions.onSetIsFenching(false));
    }
  } catch (err) {
    console.log(err);
  }
}

function* sagas(): any {
  yield all([takeLatest(weatherConsts.GET_WEATHER_SAGA, watchGetWeather)]);
}

export const weatherSaga = sagas;
