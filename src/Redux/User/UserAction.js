import { notification } from "antd";
import { onSetUser, onClearData, onSetUserId } from "./UserReducer";
import { api } from "../../Api/Api";

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    const result = await api.postRequest("auth/signIn", { email, password });
    localStorage.setItem("token", result.payload.token);
    localStorage.setItem("refreshToken", result.payload.refreshToken);
    if (result.status) {
      dispatch(onSetUser({ authorization: true }));
    } else {
      dispatch(onSetUser({ authorization: false }));
    }
    notificationAntd(result);
    return result.status;
  };

export const signUp =
  ({ email, password }) =>
  async (dispatch) => {
    const result = await api.postRequest("auth/signUp", { email, password });
    localStorage.setItem("token", result.payload.token);
    localStorage.setItem("refreshToken", result.payload.refreshToken);
    if (result.status) {
      dispatch(onSetUser({ authorization: true }));
    } else {
      dispatch(onSetUser({ authorization: false }));
    }
    notificationAntd(result);
    return result.status;
  };

export const recoveryPassword =
  ({ email, password }) =>
  async () => {
    const result = await api.postRequest("auth/recoveryPassword", {
      email,
      password,
    });
    notificationAntd(result);
    return result;
  };
export const changePassword =
  ({ oldPassword, newPassword }) =>
  async () => {
    const result = await api.postRequestAuth("auth/changePassword", {
      oldPassword,
      newPassword,
    });
    notificationAntd(result);
    return result;
  };

export const clearedData = () => (dispatch) => dispatch(onClearData({ newData: [] }));

export const setUserId = ({ id }) => (dispatch) =>  dispatch(onSetUserId({ id }));

export const notificationAntd = ({ payload = undefined, status }) => {
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
    if (!payload) payload.message = "Error";
    payload.message = payload.message || "Error";
    payload.description = payload.description || "";
    notification.error({
      message: payload.message,
      description: payload.description,
      placement: "bottomLeft",
      duration: 10,
    });
  }
};
