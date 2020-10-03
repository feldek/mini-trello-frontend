import { notification } from "antd";
import { api } from "./Api";

export const user = {
  reqAutorization(url, { email, password }) {
    return api.postRequest(url, { email, password }).then((result) => {
      this.notification(result);
      return result;
    });
  },

  notification(result) {
    result.error = result.error === undefined ? true : result.error;
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

  reqRecoveryPassword({ email }) {
    return api.postRequest("users/recoveryPassword", { email }).then((result) => {
      this.notification(result);
      return result;
    });
  },

  reqChangePassword({ email, oldPassword, newPassword }) {
    return api
      .postRequest("users/changePassword", {
        email,
        oldPassword,
        newPassword,
      })
      .then((result) => {
        this.notification(result);
        return result;
      });
  },
};
