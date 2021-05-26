import { InitialStateType, ThunkLocationType, ActionsLocationType } from "./LocationTypes";
import axios from "axios";

export const ON_SET_LOCATION = "ON_SET_LOCATION";
export const ON_SET_IS_FETCHING_LOCATION = "ON_SET_IS_FETCHING_LOCATION";
export const ON_SET_UPDATE_DATE = "ON_SET_UPDATE_DATE";

export const onSetLocation = ({
  sity,
  countryCode,
  countryName,
  latitude,
  longitude,
}: InitialStateType): ActionsLocationType => {
  return { type: ON_SET_LOCATION, sity, countryCode, countryName, latitude, longitude };
};

interface ApiLocationType {
  sity: string;
  countryCode: number;
  countryName: string;
  latitude: number;
  longitude: number;
}

interface GeolocationType {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const getLocation = (): ThunkLocationType => {
  return async (dispatch) => {
    try {
      const { coords }: GeolocationType = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      dispatch(
        onSetLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      );
    } catch (err) {
      console.log(err);

      const result = await axios.get<ApiLocationType>(
        "https://api.ipdata.co/?api-key=a3e875691c4fd0211a8f3f9f566fc2c56be06cbd8f60735d6e48f031"
      );

      if (result.status === 200) {
        dispatch(
          onSetLocation({
            sity: result.data.sity,
            countryCode: result.data.countryCode,
            countryName: result.data.countryName,
            latitude: result.data.latitude,
            longitude: result.data.longitude,
          })
        );
      } else {
        dispatch(
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
  };
};
