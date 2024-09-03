import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userState: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout: (state, action) => {
      state.status - false;
      state.userData = null;
    },

    // improvement: we can also create postSlice
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
