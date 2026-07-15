import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      if (user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      }

      if (accessToken) {
        state.token = accessToken;
        localStorage.setItem("token", accessToken);
      }

      state.isAuthenticated = true;
    },

    updateAccessToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  logout,
} = authSlice.actions;

export default authSlice.reducer;