import { InitialStateType, ActionsLocationType } from "./LocationTypes";
import { ON_SET_LOCATION } from "./LocationTypes";

const initialState: InitialStateType = {
  sity: "",
  countryCode: null,
  countryName: "",
  latitude: null,
  longitude: null,
};

const LocationReduser = (state = initialState, action: ActionsLocationType): InitialStateType => {
  switch (action.type) {
    case ON_SET_LOCATION: {
      return {
        ...state,
        sity: action.sity,
        countryCode: action.countryCode,
        countryName: action.countryName,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    }
    default:
      return state;
  }
};

export default LocationReduser;
