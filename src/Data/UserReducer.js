import { user } from "../Api/UserApi";
const SET_USER = "SET_USER";
const CLEAR_DATA = "CLEAR_DATA";

let initialState = {
  authorization: false,
  error: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        authorization: action.authorization,
        error: action.error,
      };
    }
    case CLEAR_DATA: {
      let newState = [...action.state];
      return newState;
    }
    default:
      return state;
  }
};

export const clearData = (state) => {
  return {
    type: CLEAR_DATA,
    state,
  };
};
export const setUser = ({ authorization = false, error }) => {
  return { type: SET_USER, authorization, error };
};

export const signIn = ({ email, password }) => (dispatch) => {
  return user.reqSignIn("auth/signIn", { email, password }).then(
    (result) => {
      if (!result.error && result.authorization) {
        dispatch(setUser({ authorization: result.authorization, error: result.error }));
      } else {
        dispatch(setUser({ authorization: result.authorization, error: result.error }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const signUp = ({ email, password }) => (dispatch) => {
  return user.reqSignIn("auth/signUp", { email, password }).then(
    (result) => {
      if (!result.error && result.authorization) {
        dispatch(setUser({ authorization: result.authorization, error: result.error }));
      } else {
        dispatch(setUser({ authorization: result.authorization, error: result.error }));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const recoveryPassword = ({ email }) => (dispatch) => {
  return user.reqRecoveryPassword("auth/recoveryPassword", { email });
};
export const changePassword = ({ oldPassword, newPassword }) => (dispatch) => {
  return user.reqChangePassword("auth/changePassword", { oldPassword, newPassword });
};

export default UserReducer;
