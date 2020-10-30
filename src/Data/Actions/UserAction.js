import { user } from "../../Api/UserApi";
import { onSetUser, onClearData } from "../UserReducer";

export const signIn = ({ email, password }) => async (dispatch) => {
  let result = await user.signIn("auth/signIn", { email, password });
  if (result.status) {
    dispatch(onSetUser({ authorization: true }));
  } else {
    dispatch(onSetUser({ authorization: false }));
  }
};

export const signUp = ({ email, password }) => async (dispatch) => {
  let result = await user.signIn("auth/signUp", { email, password });
  if (result.status) {
    dispatch(onSetUser({ authorization: true }));
  } else {
    dispatch(onSetUser({ authorization: false }));
  }
};

export const recoveryPassword = ({ email, password }) => async (dispatch) => {
  const result = await user.recoveryPassword("auth/recoveryPassword", { email , password});
  user.notification(result);
  return result;
};
export const changePassword = ({ oldPassword, newPassword }) => async (dispatch) => {
  const result = await user.changePassword("auth/changePassword", {
    oldPassword,
    newPassword,
  });
  user.notification(result);
  return result;
};
export const clearedData = () => (dispatch) => {
  return dispatch(onClearData({ newData: [] }));
};
