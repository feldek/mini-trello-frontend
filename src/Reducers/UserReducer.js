import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorization: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onSetUser: (state, action) => ({ ...state, authorization: action.payload.authorization }),
    onClearData: (state, action) => action.payload.newData,
  },
});

const { actions, reducer } = userSlice;
export const { onSetUser, onClearData } = actions;
export default reducer;
