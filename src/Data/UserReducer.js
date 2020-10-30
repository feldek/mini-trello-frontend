import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  authorization: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onSetUser: (state, action) => {
      // return { authorization: action.payload.authorization, error: action.payload.error };
      return { ...state, authorization: action.payload.authorization };
    },
    onClearData: (state, action) => {
      // return { state: action.payload.state };
      return action.payload.newData;
    },
  },
});

const { actions, reducer } = userSlice;
export const { onSetUser, onClearData } = actions;
export default reducer;
