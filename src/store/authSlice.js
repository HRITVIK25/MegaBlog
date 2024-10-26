import { createSlice } from "@reduxjs/toolkit";

//  this store is created to authenticate user

const initialState = {
  status: false, // by default status is set to false ie user not authenticated to login
  userData: null, // default there is no user data
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true; // at login status is set to true
      state.userData = action.payload.userData; // user data is served on login
    },

    logout: (state, action) => {
      // at logout set to default values
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions; 
export default authSlice.reducer;
