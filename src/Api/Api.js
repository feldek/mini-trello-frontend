const serverHost = "https://server-to-do-list.herokuapp.com/";
// const serverHost = "http://localhost:3004/";

export const api = {
  getRequest(url, data) {
    if (!data) {
      return fetch(serverHost + url).then((result) => result.json());
    } else {
      let query = "?";
      for (let key in data) {
        query += `&${key}=${data[key]}`;
      }
      return fetch(serverHost + url + query)
        .then((result) => result.json())
        .then((result) => {
          console.log("getRequest result:", result);
          return result;
        });
    }
  },
  postRequest(url, data) {
    return fetch(serverHost + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("postRequest result:", result);
        return result;
      });
  },
  deleteRequest(url, data) {
    return fetch(serverHost + url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("deleteRequest result:", result);
        return result;
      });
  },
};
