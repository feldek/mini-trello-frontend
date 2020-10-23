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
      return { authorization: action.payload.authorization, error: action.payload.error };
    },
    onClearData: (state, action) => {      
      return { state: action.payload.state };
    },
  },
});

const { actions, reducer } = userSlice;
export const { onSetUser, onClearData } = actions;
export default reducer;

