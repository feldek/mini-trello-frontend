import { InitialWeatherType, WeatherActionsType, weatherConsts } from "./WeatherTypes";

const initialState: InitialWeatherType = {
  data: {
    weatherDescription: "",
    temp: null,
    feels_like: null,
    temp_min: null,
    temp_max: null,
    pressure: null,
    windSpeed: null,
    sity: "",
    icon: "",
  },
  isFetching: false,
  previousUpdateTime: null,
};

const WeatherReduser = (state = initialState, action: WeatherActionsType): InitialWeatherType => {
  switch (action.type) {
    case weatherConsts.ON_SET_WEATHER: {
      return {
        ...state,
        data: {
          icon: action.payload.icon,
          weatherDescription: action.payload.weatherDescription,
          temp: action.payload.temp,
          feels_like: action.payload.feels_like,
          temp_min: action.payload.temp_min,
          temp_max: action.payload.temp_max,
          pressure: action.payload.pressure,
          windSpeed: action.payload.windSpeed,
          sity: action.payload.sity,
        },
      };
    }
    case weatherConsts.ON_SET_UPDATE_DATE: {
      return { ...state, previousUpdateTime: action.payload.previousUpdateTime };
    }
    case weatherConsts.ON_SET_IS_FETCHING_WEATHER: {
      return { ...state, isFetching: action.payload.isFetching };
    }
    default:
      return state;
  }
};

export default WeatherReduser;
