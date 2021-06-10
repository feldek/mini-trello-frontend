import { InitialLocationType, LocationActionsType, locationConsts } from "./LocationTypes";

export const initialLocation: InitialLocationType = {
  latitude: null,
  longitude: null,
};

const LocationReduser = (state = initialLocation, action: LocationActionsType): InitialLocationType => {
  switch (action.type) {
    case locationConsts.ON_SET_LOCATION: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default LocationReduser;
