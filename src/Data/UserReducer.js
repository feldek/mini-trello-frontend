import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  authorization: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onSettedUser: (state, action) => {
      return { authorization: action.payload.authorization, error: action.payload.error };
    },
    onClearedData: (state, action) => {
      return { state: action.payload.state };
    },
  },
});

const { actions, reducer } = userSlice;
export const { onSettedUser, onClearedData } = actions;
export default reducer;

