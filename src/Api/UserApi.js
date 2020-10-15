import { notification } from "antd";
import { api, serverHost } from "./Api";

export const user = {
  async reqSignIn(url, { email, password }) {
    url = serverHost + url;
    let tokens = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("reqSignIn tokens:", tokens);
    localStorage.setItem("token", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    this.notification(tokens);
    return tokens;
  },

  notification(result) {
    if (result.error === undefined) result.error = true;
    console.log("Notification result:", result);
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

  async reqRecoveryPassword(url, { email }) {
    let result = await api.postRequest(url, { email });
    this.notification(result);
    return result;
  },

  async reqChangePassword(url, { oldPassword, newPassword }) {
    let result = await api.postRequest(url, { oldPassword, newPassword });
    this.notification(result);
    return result;
  },
};
