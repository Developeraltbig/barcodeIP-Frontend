

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Expecting { user, accessToken, rememberMe }
      const { user, accessToken, refreshToken } = action.payload; 
      
      state.user = user;
      state.token = accessToken;
    
      state.isAuthenticated = true;
      state.refreshToken = refreshToken;

      // Only persist if 'Remember Me' was checked
      // if (rememberMe) {
      //   localStorage.setItem("rememberMe", true);
      // } else {
      //   localStorage.setItem("rememberMe", false);
      // }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem("refreshToken");
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;






















// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
//   refreshToken: localStorage.getItem("refreshToken") || null,
//   isAuthenticated: !!localStorage.getItem('token'),
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {

//     // Login
//     setCredentials: (state, action) => {
//       const { user, accessToken, refreshToken } = action.payload;

//       state.user = user;
//       state.token = accessToken;
//       state.refreshToken = refreshToken;
//       state.isAuthenticated = true;

//       // optional persistence
//       // localStorage.setItem("token", accessToken);
//       // localStorage.setItem("refreshToken", refreshToken);
//       // localStorage.setItem("user", JSON.stringify(user));
//     },

//     //  Update user only (for profile updates)
//     // setUser: (state, action) => {
//     //   state.user = {
//     //     ...state.user,
//     //     ...action.payload
//     //   };

//     //   localStorage.setItem("user", JSON.stringify(state.user));
//     // },

//     // Logout
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.refreshToken = null;
//       state.isAuthenticated = false;

//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('rememberMe');
//       localStorage.removeItem('user');
//     },

//   },
// });

// export const { setCredentials, setUser, logout } = authSlice.actions;
// export default authSlice.reducer;
