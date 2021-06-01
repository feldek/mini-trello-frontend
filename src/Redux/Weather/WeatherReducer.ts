import {
  InitialWeatherType,
  ActionsWeatherType,
  ON_SET_WEATHER,
  ON_CLEAR_WEATHER,
  ON_SET_IS_FETCHING_WEATHER,
  ON_SET_UPDATE_DATE,
} from "./WeatherTypes";

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

const WeatherReduser = (state = initialState, action: ActionsWeatherType): InitialWeatherType => {
  switch (action.type) {
    case ON_SET_WEATHER: {
      return {
        ...state,
        data: {
          icon: action.icon,
          weatherDescription: action.weatherDescription,
          temp: action.temp,
          feels_like: action.feels_like,
          temp_min: action.temp_min,
          temp_max: action.temp_max,
          pressure: action.pressure,
          windSpeed: action.windSpeed,
          sity: action.sity,
        },
      };
    }
    case ON_SET_UPDATE_DATE: {
      return { ...state, previousUpdateTime: action.previousUpdateTime };
    }
    case ON_SET_IS_FETCHING_WEATHER: {
      return { ...state, isFetching: action.isFetching };
    }
    case ON_CLEAR_WEATHER: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default WeatherReduser;
