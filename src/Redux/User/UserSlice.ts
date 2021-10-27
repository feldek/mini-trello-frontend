import { notification } from "antd";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Api/Api";
import { IState } from "../Store";

interface ISignIn {
  email: string;
  password: string;
}
interface ITokens {
  payload: { token: string; refreshToken: string; message?: string; description?: string };
  status: boolean;
}
export const signIn = createAsyncThunk<boolean, ISignIn, { state: IState }>(
  "user/signIn",
  async ({ email, password }) => {
    const result = await api.postRequest<ITokens>("auth/signIn", { email, password });
    localStorage.setItem("token", result.payload.token);
    localStorage.setItem("refreshToken", result.payload.refreshToken);
    notificationAntd(result);
    return result.status;
  },
);

export const signUp = createAsyncThunk<boolean, ISignIn, { state: IState }>(
  "user/signIn",
  async ({ email, password }) => {
    const result = await api.postRequest<ITokens>("auth/signUp", { email, password });
    localStorage.setItem("token", result.payload.token);
    localStorage.setItem("refreshToken", result.payload.refreshToken);
    notificationAntd(result);
    return result.status;
  },
);

export const recoveryPassword = createAsyncThunk<boolean, ISignIn, { state: IState }>(
  "auth/recoveryPassword",
  async ({ email, password }) => {
    const result = await api.postRequest<{
      payload: { message?: string; description?: string };
      status: boolean;
    }>("auth/recoveryPassword", {
      email,
      password,
    });
    notificationAntd(result);
    return result.status;
  },
);

export const clearedData = createAsyncThunk<void, void, { state: IState }>(
  "user/onClearData",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(onClearData({ newData: {} }));
  },
);

interface IUser {
  authorization: boolean;
  error: boolean;
  id: string | null;
}

const initialState: IUser = {
  authorization: localStorage.getItem("token") ? true : false,
  error: false,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onSetUser: (state, action) => ({ ...state, authorization: action.payload.authorization }),
    onClearData: (state, action) => action.payload.newData,
    onSetUserId: (state, action) => ({ ...state, id: action.payload.id }),
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authorization = action.payload ? true : false;
    });
  },
});

export const {
  reducer: UserReducer,
  actions: { onSetUser, onClearData, onSetUserId },
} = userSlice;

interface INotificationAntd {
  payload: { message?: string; description?: string };
  status: boolean;
}

export const notificationAntd = ({ payload, status }: INotificationAntd): void => {
  if (status) {
    payload.message = payload.message || "The operation was successful";
    payload.description = payload.description || "";
    notification.success({
      message: payload.message,
      description: payload.description,
      placement: "topRight",
    });
  } else {
    if (payload instanceof TypeError) {
      payload.message = "Server is currently unavailable";
    }

    notification.error({
      message: payload ? payload.message : "Error",
      description: payload ? payload.description : "",
      placement: "topRight",
      duration: 10,
    });
  }
};
