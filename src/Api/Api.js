export const serverHost = "https://server-to-do-list.herokuapp.com/";
export const getOutUrl = "authorization/getOut";
const fetchWrap = require("fetch-wrap");
export const simpleFetch = fetchWrap(fetch, []);

export const api = {
  async getRequestAuth(url, data) {
    let getUrl = new URL(serverHost + url),
      params = data;
    getUrl.search = new URLSearchParams(params).toString();
    return fetch(getUrl);
  },

  async postRequestAuth(url, data) {
    return fetch(serverHost + url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async patchRequestAuth(url, data) {
    return fetch(serverHost + url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
  async deleteRequestAuth(url, data) {
    return fetch((url = serverHost + url), {
      method: "DELETE",
      body: JSON.stringify(data),
    });
  },
};

export const postRequest = fetchWrap(fetch, [
  async (url, data, innerFetch) => {
    try {
      let options = {};
      options.method = "POST";
      options.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
      let response = await innerFetch(serverHost + url, options);
      let payload;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        payload = await response.json();
      }
      if (!response.ok) await Promise.reject(payload);
      console.log("postRequest:", { payload, status: true });
      return { payload, status: true };
    } catch (payload) {
      console.log("ERR postRequest:", { payload, status: false });
      return { payload, status: false };
    }
  },
]);

fetch = fetchWrap(fetch, [
  async (url, options, innerFetch) => {
    try {
      if (!options) options = {};
      let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
      if (!token) return window.location.replace(getOutUrl);
      if (!options.headers) {
        options.headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }
      options.headers.Authorization = `Bearer ${token}`;

      let response = await innerFetch(url, options);

      if (!response.ok) await Promise.reject(response);
      if (!options.method) options.method = "GET";

      let payload;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        payload = await response.json();
      }
      console.log(options.method, ":", payload);
      return { payload, status: true };
    } catch (err) {
      if (err.status === 403) {
        return await refreshTokens(url, options);
      }
      if (err.status === 401) window.location.replace(getOutUrl);
      if (err instanceof TypeError) {
        return { payload: err, status: false };
      }
      const contentType = err.headers.get("content-type");
      let payload;
      console.log(contentType);
      if (contentType && contentType.indexOf("application/json") !== -1) {
        payload = await err.json();
      }
      console.log("ERR", { payload, status: false });
      return { payload, status: false };
    }
  },
]);

async function refreshTokens(url, options) {
  let refreshToken = localStorage.getItem("refreshToken");
  let response = await simpleFetch(serverHost + "auth/refreshTokensAuth", {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  let data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  let restartReq = await fetch(url, options);
  return restartReq;
}
