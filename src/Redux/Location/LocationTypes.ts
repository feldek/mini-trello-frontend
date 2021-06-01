import { BaseThunkType, InferActionsTypes } from "../Store";
import { locationActions } from "./LocationActions";

export const locationConsts = {
  ON_SET_LOCATION: "ON_SET_LOCATION",

  GET_LOCATION_SAGA: "GET_LOCATION_SAGA",
} as const;

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
