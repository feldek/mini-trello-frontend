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
        console.log("Post req result:",result);
        return result;
      });
  },
  reqAutorization(url, { email, password }) {
    return this.postRequest(url, { email, password }).then((result) => {
      this.notification(result);
      return result;
    });
  },

  notification(result) {    
    result.error = result.error === undefined ? true: result.error;
    console.log("Notification result:",result)
    if (!result.error) {
      result.message = result.message || "The operation was successful";
      result.description = result.description || "";
      notification.success({
        message: result.message,
        description: result.description,
        placement: "bottomLeft",
      });
    } else {
      result.message = result.message || "Error";
      result.description = result.description || "";
      notification.error({
        message: result.message,
        description: result.description,
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
