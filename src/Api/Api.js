// const serverHost = "https://server-to-do-list.herokuapp.com/";
export const serverHost = "http://localhost:3004/";
export const toDoListHost = "http://localhost:3000/";
const getOutUrl = toDoListHost + "authorization/getOut";
const fetchWrap = require("fetch-wrap");
const simpleFetch = fetchWrap(fetch, []);

export const api = {
  async getRequest(url, data) {
    url = serverHost + url;
    let query;
    if (!data) {
      query = "";
      data = {};
    } else {
      query = "?";
      for (let key in data) {
        query += `&${key}=${data[key]}`;
      }
    }
    data.method = "GET";
    url = url + query;
    return fetch(url);
  },

  async postRequest(url, data) {
    url = serverHost + url;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async putRequest(url, data) {
    url = serverHost + url;
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  async deleteRequest(url, data) {
    url = serverHost + url;
    return fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
    });
  },
};

fetch = fetchWrap(fetch, [
  async function middleware1(url, options, innerFetch) {
    try {
      if (!options) options = {};
      let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
      // console.log("token:", token);
      if (!token) return window.location.replace(getOutUrl);
      if (!options.headers) {
        options.headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }
      options.headers.Authorization = `Bearer ${token}`;
      let response = await innerFetch(url, options);
      // .catch((err) => {
      //   err.body = options.body;
      //   return Promise.reject(err);
      // });
      if (!response.ok) await Promise.reject(response);
      if (!options.method) options.method = "GET";
      let payload = await response.json();
      console.log(options.method, ":", payload);
      return { payload, status: true };
    } catch (err) {
      // let aaa = JSON.parse(err)
      // console.log("UNDEFINED RESPONSE: body", err.body);
      if (err.status === 403) {
        return await refreshToken(url, options);
      }
      // let data = JSON.parse(err.body);
      if (err.status === 401) window.location.replace(getOutUrl);
      return { err, status: false };
    }
  },
]);

async function refreshToken(url, options) {
  let refreshToken = localStorage.getItem("refreshToken");
  let response = await simpleFetch(serverHost + "auth/refreshToken", {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  let data = await response.json();
  console.log("in refresh Token");
  console.log("New token:", data.token);
  console.log("New refreshToken:", data.refreshToken);
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  let restarsReq = await fetch(url, options);
  return restarsReq;
}
