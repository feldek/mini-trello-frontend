import { InitialStateType, ThunkLocationType, ActionsLocationType } from "./LocationTypes";
import { api } from "../../Api/Api";

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

export const getLocation = (): ThunkLocationType => {
  return async (dispatch) => {
    try {
      const result = await api.getRequestAuth<{ status: boolean; payload: any }>("api/geoplugin");
      dispatch(
        onSetLocation({
          sity: result.payload.geoplugin_city,
          countryCode: result.payload.geoplugin_countryCode,
          countryName: result.payload.geoplugin_countryName,
          latitude: result.payload.geoplugin_latitude,
          longitude: result.payload.geoplugin_longitude,
        })
      );
    } catch (err) {
      console.log(err);
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
  };
};
