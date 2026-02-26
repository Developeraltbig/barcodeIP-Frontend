

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, accessToken } = action.payload; // Adjust based on your API response structure
//       state.user = user;
//       state.token = accessToken;
//       state.isAuthenticated = true;
//       localStorage.setItem('token', accessToken);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       // localStorage.removeItem('token');
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
























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