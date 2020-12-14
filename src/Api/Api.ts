import config, { forcedLogOut } from "../Constants";
import axios from "axios";

const apiUrl = config.apiUrl;

const instance = axios.create({ baseURL: apiUrl });
instance.interceptors.response.use(
  function (response) {
    return new Promise<any>((resolve) => {
      resolve({ payload: response.data, status: true });
    });
  },
  function (error) {
    if (error.message === "Network Error") {
      return Promise.resolve({ payload: error, status: false });
    }
    return { payload: error.response.data, status: false };
  }
);

const instanceAuth = axios.create({ baseURL: apiUrl });
instanceAuth.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
instanceAuth.interceptors.response.use(
  function (response) {
    console.log(response.data);
    return new Promise<any>((resolve) => {
      resolve({ payload: response.data, status: true });
    });
  },
  function (error) {
    const originalRequest = error.config;
    if (error.message === "Network Error") {
      return Promise.resolve({ payload: error, status: false });
    }
    if (error.response.status === 403) {
      return refreshTokensAxios(originalRequest);
    }
    if (error.response.status === 401) {
      return window.location.replace(forcedLogOut);
    }
    return { payload: error.response.data, status: false };
  }
);

const api = {
  getRequestAuth<T>(url: string, data?: any): Promise<T> {
    return instanceAuth.get(url, { params: data });
  },
  postRequestAuth<T>(url: string, data: any): Promise<T> {
    return instanceAuth.post(url, data);
  },
  patchRequestAuth<T>(url: string, data: any): Promise<T> {
    return instanceAuth.patch(url, data);
  },
  deleteRequestAuth<T>(url: string, data: any): Promise<T> {
    return instanceAuth.delete(url, { data });
  },
  postRequest<T>(url: string, data?: any, extra?: any): Promise<T> {
    return instance.post(url, data, extra);
  },
};

const refreshTokensAxios = async (config: any) => {
  let refreshToken = localStorage.getItem("refreshToken");
  let tokens = await axios.post(
    apiUrl + "auth/refreshTokensAuth",
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } }
  );
  if (tokens.status === 401) {
    return window.location.replace(forcedLogOut);
  }
  localStorage.setItem("token", tokens.data.token);
  localStorage.setItem("refreshToken", tokens.data.refreshToken);
  return instanceAuth(config);
};

export const requestLocation = async () => {
  return await axios.get("http://www.geoplugin.net/json.gp");
};
export const requestWeather = async ({ lat, lon, appid, units }:{lat: number, lon:number, appid:string, units:string}) => {
  return await axios.get("http://api.openweathermap.org/data/2.5/weather", {
    params: { lat, lon, appid, units },
  });
};

export { api };
