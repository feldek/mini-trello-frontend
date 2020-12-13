import config from "../Constants";
export const apiUrl = config.apiUrl;
export const forcedLogOut = "authorization/forcedLogOut";
const fetchWrap = require("fetch-wrap");
export const simpleFetch = fetchWrap(fetch, []);

export const api = {
  getRequestAuth<T>(url: string | URL, data?: any): Promise<T> {
    let getUrl: any = new URL(apiUrl + url),
      params = data;
    getUrl.search = new URLSearchParams(params).toString();
    return new Promise<any>((resolve) => {
      resolve(fetch(getUrl));
    });
  },

  postRequestAuth<T>(url: string | URL, data: any): Promise<T> {
    return new Promise<any>((resolve) => {
      resolve(
        fetch(apiUrl + url, {
          method: "POST",
          body: JSON.stringify(data),
        })
      );
    });
  },
  patchRequestAuth<T>(url: string | URL, data: any): Promise<T> {
    return new Promise<any>((resolve) => {
      resolve(
        fetch(apiUrl + url, {
          method: "PATCH",
          body: JSON.stringify(data),
        })
      );
    });
  },
  deleteRequestAuth<T>(url: string | URL, data: any): Promise<T> {
    return new Promise<any>((resolve) => {
      resolve(
        fetch((url = apiUrl + url), {
          method: "DELETE",
          body: JSON.stringify(data),
        })
      );
    });
  },
};

export const postRequest = fetchWrap(fetch, [
  async <T>(url: string | URL, data: any, innerFetch: any): Promise<T> => {
    try {
      let options: any = {};
      options.method = "POST";
      options.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
      let response = await innerFetch(apiUrl + url, options);
      if (!response.ok) await Promise.reject(response);
      let payload = await response.json();
      console.log("postRequest:", { payload, status: true });
      return new Promise<any>((resolve) => {
        resolve({ payload, status: true });
      });
    } catch (err) {
      if (err instanceof TypeError) {
        return new Promise<any>((resolve) => {
          resolve({ payload: err, status: false });
        });
        // return { payload: err, status: false };
      }
      let payload = await err.json();
      console.log("ERR postRequest:", { payload, status: false });
      return new Promise<any>((resolve) => {
        resolve({ payload, status: false });
      });
      // return { payload, status: false };
    }
  },
]);

window.fetch = fetchWrap(fetch, [
  async (url: string | URL, options: any, innerFetch: any) => {
    try {
      if (!options) options = {};
      let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
      if (!token) {
        return window.location.replace(forcedLogOut);
      }
      if (!options.headers) {
        options.headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }
      options.headers.Authorization = `Bearer ${token}`;

      let response = await innerFetch(url, options);
      if (!response.ok) await Promise.reject(response);
      let payload = await response.json();
      console.log(options.method || "GET", ":", payload);

      return { payload, status: true };
    } catch (err) {
      if (err.status === 403) {
        return refreshTokens(url, options);
      }
      if (err.status === 401) {
        return window.location.replace(forcedLogOut);
      }
      if (err instanceof TypeError) {
        return { payload: err, status: false };
      }
      let payload = await err.json();
      console.log("ERR", { payload, status: false });
      return { payload, status: false };
    }
  },
]);

async function refreshTokens<T>(url: any, options: any): Promise<T> {
  let refreshToken = localStorage.getItem("refreshToken");
  let response = await simpleFetch(apiUrl + "auth/refreshTokensAuth", {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  if (response.status === 401) {
    window.location.replace(forcedLogOut);
  }
  let data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  // let restartReq = await fetch(url, options);
  return new Promise<any>((resolve) => {
    resolve(() => fetch(url, options));
  });
  // return restartReq;
}
