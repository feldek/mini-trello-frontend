import axios from "axios";
import { put, all, takeLatest } from "redux-saga/effects";

import { locationActions } from "./LocationActions";
import { CoordsType, InitialLocationType, locationConsts } from "./LocationTypes";

function* watchGetLocation() {
  try {
    const { coords }: CoordsType = yield new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    yield put(
      locationActions.onSetLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    );
  } catch (err) {
    console.log(err);

    const result: { data: InitialLocationType; status: number } = yield axios.get(
      "https://api.ipdata.co/?api-key=a3e875691c4fd0211a8f3f9f566fc2c56be06cbd8f60735d6e48f031"
    );

    console.log(result);
    if (result.status === 200) {
      yield put(
        locationActions.onSetLocation({
          sity: result.data.sity,
          countryCode: result.data.countryCode,
          countryName: result.data.countryName,
          latitude: result.data.latitude,
          longitude: result.data.longitude,
        })
      );
    } else {
      yield put(
        locationActions.onSetLocation({
          latitude: null,
          longitude: null,
        })
      );
    }
  }
}

function* sagas(): any {
  yield all([takeLatest(locationConsts.GET_LOCATION, watchGetLocation)]);
}

export const locationSaga = sagas;
