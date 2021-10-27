import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorization: false,
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
});

const { actions, reducer } = userSlice;
export const { onSetUser, onClearData, onSetUserId } = actions;
export default reducer;
