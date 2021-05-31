import axios from "axios";
import { LocationThunkType, InitialLocationType, ON_SET_LOCATION, CoordsType } from "./LocationTypes";

export const getLocation = (): LocationThunkType => {
  return async (dispatch) => {
    try {
      const { coords }: CoordsType = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      dispatch(
        locationActions.onSetLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      );
    } catch (err) {
      console.log(err);

      const result = await axios.get<InitialLocationType>(
        "https://api.ipdata.co/?api-key=a3e875691c4fd0211a8f3f9f566fc2c56be06cbd8f60735d6e48f031"
      );

      if (result.status === 200) {
        dispatch(
          locationActions.onSetLocation({
            sity: result.data.sity,
            countryCode: result.data.countryCode,
            countryName: result.data.countryName,
            latitude: result.data.latitude,
            longitude: result.data.longitude,
          })
        );
      } else {
        dispatch(
          locationActions.onSetLocation({
            latitude: null,
            longitude: null,
          })
        );
      }
    }
  };
};

export const locationActions = {
  onSetLocation: (data: InitialLocationType) => ({ type: ON_SET_LOCATION, payload: { ...data } } as const),
};
