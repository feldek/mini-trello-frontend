import axios from "axios";
import {
  InitialStateType,
  ThunkLocationType,
  ActionsLocationType,
  ON_SET_LOCATION,
  ApiLocationType,
  GeolocationType,
} from "./LocationTypes";

export const onSetLocation = ({
  sity,
  countryCode,
  countryName,
  latitude,
  longitude,
}: InitialStateType): ActionsLocationType => {
  return { type: ON_SET_LOCATION, sity, countryCode, countryName, latitude, longitude };
};

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
