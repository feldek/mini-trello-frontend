import { ON_SET_LOCATION } from "./LocationActions";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../Store";

export type InitialStateType = {
  sity?: string | null;
  countryCode?: number | null;
  countryName?: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type ActionsLocationType = InitialStateType & { type: typeof ON_SET_LOCATION };
export type ThunkLocationType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsLocationType>;
