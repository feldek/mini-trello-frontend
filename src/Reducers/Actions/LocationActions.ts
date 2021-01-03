import { api } from "./../../Api/Api";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../Store";

export const ON_SET_LOCATION = "ON_SET_LOCATION";
export const ON_CLEAR_DATA = "user/onClearData";
export const ON_SET_IS_FETCHING_LOCATION = "ON_SET_IS_FETCHING_LOCATION";
export const ON_SET_UPDATE_DATE = "ON_SET_UPDATE_DATE";

export type ActionsLocationType = onSetLocationType;

type ThunkLocationType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  ActionsLocationType
>;

type onSetLocationType = {
  type: typeof ON_SET_LOCATION;
  sity: string | null;
  countryCode: number | null;
  countryName: string | null;
  latitude: number | null;
  longitude: number | null;
};
export const onSetLocation = ({
  sity,
  countryCode,
  countryName,
  latitude,
  longitude,
}: GetLocationType): onSetLocationType => {
  return { type: ON_SET_LOCATION, sity, countryCode, countryName, latitude, longitude };
};

type GetLocationType = {
  sity: string | null;
  countryCode: number | null;
  countryName: string | null;
  latitude: number | null;
  longitude: number | null;
};
export const getLocation = (): ThunkLocationType => {
  return async (dispatch) => {
    try {
      const result = await api.getRequestAuth<{ status: boolean; payload: any }>(
        "geoplugin"
      );
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
