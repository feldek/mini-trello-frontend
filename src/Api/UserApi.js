import { notification } from "antd";
import { api, postRequest } from "./Api";

export const user = {
  async signIn(url, { email, password }) {
    let tokens = await postRequest(url, { email, password });
    localStorage.setItem("token", tokens.payload.token);
    localStorage.setItem("refreshToken", tokens.payload.refreshToken);
    this.notification(tokens.payload);
    return tokens;
  },

  notification(result) {
    if (result.error === undefined) result.error = true;
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
    return result;
  },

  async changePassword(url, { oldPassword, newPassword }) {
    let result = await api.postRequestAuth(url, { oldPassword, newPassword });
    if (result instanceof TypeError) {
      this.notification({ message: "Server is currently unavailable", error: true });
    } else {
      this.notification(result.payload);
    }
    return result;
  },
};
