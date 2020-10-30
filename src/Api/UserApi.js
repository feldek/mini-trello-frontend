import { notification } from "antd";
import { api, postRequest } from "./Api";

export const user = {
  async signIn(url, { email, password }) {
    let tokens = await postRequest(url, { email, password });
    localStorage.setItem("token", tokens.payload.token);
    localStorage.setItem("refreshToken", tokens.payload.refreshToken);
    this.notification(tokens);
    return tokens;
  },

  notification({ payload, status }) {
    if (status) {
      payload.message = payload.message || "The operation was successful";
      payload.description = payload.description || "";
      notification.success({
        message: payload.message,
        description: payload.description,
        placement: "bottomLeft",
      });
    } else {
      if (payload instanceof TypeError) {
        payload.message = "Server is currently unavailable";
      }
      payload.message = payload.message || "Error";
      payload.description = payload.description || "";
      notification.error({
        message: payload.message,
        description: payload.description,
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
    this.notification(result);    
    return result;
  },
};
