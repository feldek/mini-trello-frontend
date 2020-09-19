import { user } from "../Api/Api";

const SET_USER = "SET_USER";

let localStorage = JSON.parse(window.localStorage.getItem("persist:root"));
let initialState = localStorage
  ? localStorage.dataUser
  : {
      email: "",
      password: "",
      authorization: false,
      error: false,
    };

const DataUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        email: action.email,
        password: action.password,
        authorization: action.authorization,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export const setUser = (email, password, authorization = false, error) => {
  return { type: SET_USER, email, password, authorization, error };
};

export const signIn = ({ email, password }) => (dispatch) => {
  return user.reqAutorization("signIn", { email, password }).then(
    (result) => {
      if (!result.error && result.authorization) {
        dispatch(setUser(email, password, true, result.error));
      } else {
        dispatch(setUser(email, password, false, result.error));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};
export const signUp = ({ email, password }) => (dispatch) => {
  return user.reqAutorization("signUp", { email, password }).then(
    (result) => {
      if (!result.error && result.authorization) {
        dispatch(setUser(email, password, true, result.error));
      } else {
        dispatch(setUser(email, password, false, result.error));
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

export const recoveryPassword = ({ email }) => (dispatch) => {
  return user.reqRecoveryPassword({ email });
};
export const changePassword = ({ email, oldPassword, newPassword }) => (dispatch) => {
  return user.reqChangePassword({ email, oldPassword, newPassword });
};

export default DataUserReducer;
