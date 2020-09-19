import { notification } from "antd";
const serverHost = "https://server-to-do-list.herokuapp.com/";

export const user = {
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
        console.log(result);
        return result;
      });
  },
  reqAutorization(url, { email, password }) {
    return this.postRequest(url, { email, password }).then((result) => {
      this.notificationAutorization(result);
      return result;
    });
  },
  notificationAutorization({ error = true, authorization = false, message = "Server error"}) {
    if (!error && authorization) {
      notification.success({
        message: "You are successfully logged in ",
        placement: "bottomLeft",
      });
    } else {
      notification.error({
        message: "Error",
        description: message,
        placement: "bottomLeft",
        duration: 10,
      });
    }
  },
  notification({ message, error = true }) {
    if (!error) {
      notification.success({
        message: "The operation was successful",
        description: message,
        placement: "bottomLeft",
      });
    } else {
      notification.error({
        message: "Error",
        description: message,
        placement: "bottomLeft",
        duration: 10,
      });
    }
  },

  reqRecoveryPassword({ email }) {
    return this.postRequest("recoveryPassword", { email }).then((result) => {
      this.notification(result);
      return result;
    });
  },

  reqChangePassword({ email, oldPassword, newPassword }) {
    return this.postRequest("changePassword", {
      email,
      oldPassword,
      newPassword,
    }).then((result) => {
      this.notification(result);
      return result;
    });
  },
};
