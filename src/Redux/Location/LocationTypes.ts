import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../Store";

export const ON_SET_LOCATION = "ON_SET_LOCATION";
export const GET_LOCATION = "GET_LOCATION";

export type InitialStateType = {
  sity?: string | null;
  countryCode?: number | null;
  countryName?: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type ActionsLocationType = InitialStateType & { type: typeof ON_SET_LOCATION };
export type ThunkLocationType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsLocationType>;

export type ApiLocationType = {
  sity: string;
  countryCode: number;
  countryName: string;
  latitude: number;
  longitude: number;
};

export type GeolocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};
