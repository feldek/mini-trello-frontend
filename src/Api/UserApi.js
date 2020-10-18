import { notification } from "antd";
import { api, postRequest } from "./Api";

export const user = {
  async signIn(url, { email, password }) {
    let tokens = await postRequest(url, { email, password });
    console.log("SignIn tokens:", tokens.payload);
    localStorage.setItem("token", tokens.payload.token);
    localStorage.setItem("refreshToken", tokens.payload.refreshToken);
    this.notification(tokens.payload);
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
      if (result.message === "Failed to fetch") {
        result.message = "Server is currently unavailable";
      }
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

  async recoveryPassword(url, { email }) {
    let result = await postRequest(url, { email });
    this.notification(result.payload);
    return result;
  },

  async changePassword(url, { oldPassword, newPassword }) {
    let result = await api.postRequestAuth(url, { oldPassword, newPassword });
    this.notification(result.payload);
    return result;
  },
};
