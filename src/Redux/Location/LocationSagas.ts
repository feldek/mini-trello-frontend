import axios from "axios";
import { put, all, takeLatest } from "redux-saga/effects";
import {
  ActionsLocationType,
  ApiLocationType,
  CoordsType,
  InitialLocationType,
  GET_LOCATION,
  ON_SET_LOCATION,
} from "./LocationTypes";

const onSetLocation = (payload: InitialLocationType): ActionsLocationType => {
  return { type: ON_SET_LOCATION, ...payload };
};

export const getLocationSaga = (): { type: typeof GET_LOCATION } => ({ type: GET_LOCATION });
function* watchGetLocation() {
  try {
    const { coords }: CoordsType = yield new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    console.log(coords);

    yield put(
      onSetLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    );
  } catch (err) {
    console.log(err);

    const result: { data: ApiLocationType; status: number } = yield axios.get(
      "https://api.ipdata.co/?api-key=a3e875691c4fd0211a8f3f9f566fc2c56be06cbd8f60735d6e48f031"
    );

    console.log(result);
    if (result.status === 200) {
      yield put(
        onSetLocation({
          sity: result.data.sity,
          countryCode: result.data.countryCode,
          countryName: result.data.countryName,
          latitude: result.data.latitude,
          longitude: result.data.longitude,
        })
      );
    } else {
      yield put(
        onSetLocation({
          sity: null,
          countryCode: null,
          countryName: null,
          latitude: null,
          longitude: null,
        })
      );
    }
  }
}

function* sagas() {
  yield all([takeLatest(GET_LOCATION, watchGetLocation)]);
}

export const locationSaga = sagas;
