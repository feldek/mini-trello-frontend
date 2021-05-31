import { InitialLocationType, LocationActionsType } from "./LocationTypes";
import { ON_SET_LOCATION } from "./LocationTypes";

export const initialLocation: InitialLocationType = {
  latitude: null,
  longitude: null,
};

const LocationReduser = (state = initialLocation, action: LocationActionsType): InitialLocationType => {
  switch (action.type) {
    case ON_SET_LOCATION: {
      console.log(action.payload);
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default LocationReduser;
