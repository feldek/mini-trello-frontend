import { InitialStateType as InitialLocationType } from "./../Location/LocationTypes";
import { ApiGetWeatherType, GET_WEATHER } from "./WeatherTypes";
import { put, all, takeLatest, select } from "redux-saga/effects";
import {
  GetWeatherType,
  onSetIsFenchingType,
  onSetUpdateDateType,
  onSetWeatherType,
  onGetWeatherType,
  ON_SET_IS_FETCHING_WEATHER,
  ON_SET_UPDATE_DATE,
  ON_SET_WEATHER,
} from "./WeatherTypes";
import { getLocationSaga } from "../Location/LocationSagas";
import { api } from "../../Api/Api";

const onSetIsFenching = (isFetching: boolean): onSetIsFenchingType => {
  return { type: ON_SET_IS_FETCHING_WEATHER, isFetching };
};
const onSetUpdateDate = (previousUpdateTime: number): onSetUpdateDateType => {
  return { type: ON_SET_UPDATE_DATE, previousUpdateTime };
};

const onSetWeather = (payload: GetWeatherType): onSetWeatherType => {
  return {
    type: ON_SET_WEATHER,
    ...payload,
  };
};

export const getWeatherSaga = (requestInterval = 0): onGetWeatherType => ({
  type: GET_WEATHER,
  requestInterval,
});

function* watchGetWeather(action: onGetWeatherType) {
  try {
    const { requestInterval } = action;
    const previousUpdateTime: number = yield select((s) => s.weather.previousUpdateTime);
    const currentTime = new Date().getTime();
    if (!previousUpdateTime || currentTime - previousUpdateTime > requestInterval) {
      yield put(onSetIsFenching(true));
      yield put(onSetUpdateDate(currentTime));
      yield put(getLocationSaga());

      const locationState: InitialLocationType = yield select((s) => s.location);
      if (locationState.latitude === null || locationState.longitude === null) {
        throw new Error();
      }

      const { payload }: { payload: ApiGetWeatherType } = yield api.getRequestAuth("api/weatherplugin", {
        lat: locationState.latitude,
        lon: locationState.longitude,
      });
      yield put(
        onSetWeather({
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
      yield put(onSetIsFenching(false));
    }
  } catch (err) {
    console.log(err);
  }
}

function* sagas() {
  yield all([takeLatest(GET_WEATHER, watchGetWeather)]);
}

export const weatherSaga = sagas;
