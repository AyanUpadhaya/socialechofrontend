// reducers/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("echoToken"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: localStorage.getItem("echoToken") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        _id: action.payload._id,
      };
      state.isAuthenticated = true;
      localStorage.setItem("echoToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutSuccess(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("echoToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
