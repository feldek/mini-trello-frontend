import { BaseThunkType, InferActionsTypes } from "../Store";
import { locationActions } from "./LocationActions";

export const ON_SET_LOCATION = "ON_SET_LOCATION";
export const GET_LOCATION = "GET_LOCATION";

export type InitialLocationType = {
  sity?: string;
  countryCode?: number;
  countryName?: string;
  latitude: number | null;
  longitude: number | null;
};

export type LocationActionsType = InferActionsTypes<typeof locationActions>;
export type LocationThunkType = BaseThunkType<LocationActionsType>;

export type CoordsType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};
