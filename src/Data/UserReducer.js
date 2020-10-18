import { user } from "../Api/UserApi";
const ON_SETED_USER = "ON_SETED_USER";
const ON_CLEARED_DATA = "ON_CLEARED_DATA";

let initialState = {
  authorization: false,
  error: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_SETED_USER: {
      return {
        authorization: action.authorization,
        error: action.error,
      };
    }
    case ON_CLEARED_DATA: {
      let newState = [];
      return newState;
    }
    default:
      return state;
  }
};

export const onClearedData = () => {
  return { type: ON_CLEARED_DATA };
};
export const onSetedUser = ({ authorization = false, error }) => {
  return { type: ON_SETED_USER, authorization, error };
};

export const signIn = ({ email, password }) => async (dispatch) => {
  let result = await user.signIn("auth/signIn", { email, password });
  if (result.status) {
    dispatch(onSetedUser({ authorization: result.payload.authorization, error: result.payload.error }));
  } else {
    dispatch(onSetedUser({ authorization: false, error: result.payload.error }));
  }
};

export const signUp = ({ email, password }) => async(dispatch) => {
  let result = await user.signIn("auth/signUp", { email, password })
    if (result.status) {
      dispatch(onSetedUser({ authorization: result.payload.authorization, error: result.payload.error }));
    } else {
      dispatch(onSetedUser({ authorization: false, error: result.payload.error }));
    }
};

export const recoveryPassword = ({ email }) => (dispatch) => {
  return user.recoveryPassword("auth/recoveryPassword", { email });
};
export const changePassword = ({ oldPassword, newPassword }) => (dispatch) => {
  return user.changePassword("auth/changePassword", { oldPassword, newPassword });
};

export default UserReducer;
