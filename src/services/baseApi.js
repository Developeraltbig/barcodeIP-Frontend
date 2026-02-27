// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logout } from '../features/slice/auth/authSlice';

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   credentials: 'include',
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     console.log('token--', token);
//     if (token) headers.set('authorization', `Bearer ${token}`);
//     return headers;
//   }
// });

// const baseQueryWithAuth = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     api.dispatch(logout); // auto logout
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: 'api',
//   baseQuery: baseQueryWithAuth,
//   endpoints: () => ({})
// });


import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../features/slice/auth/authSlice';
import { useSelector } from 'react-redux';

let api_url = "http://54.146.252.18:5000";

// A basic fetchBaseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  }
});



const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the error is 401, try to refresh
  if (result.error && result.error.status === 401) {
    console.log("1")
    let refresh_token = localStorage.getItem("rememberMe");
    // PREVENT LOOP: Check if the failed request was actually the refresh request itself
    // Adjust the URL string to match your refresh endpoint exactly
    if (args.url === "/api/v1/auth/refresh-token") {
      api.dispatch(logout());
      return result;
    }


    if (refresh_token === true) {
      console.log('ddd');
      const response = await axios.post(`${api_url}/api/v1/auth/refresh-token`, {
        refreshToken: api.getState().auth.refreshToken
      })

      if (response.status === 200) {
        // Refresh worked!
        api.dispatch(setCredentials({
          user: api.getState().auth.user,
          refreshToken: api.getState().auth.refreshToken,
          accessToken: response.data.data.accessToken,
          // rememberMe: !!localStorage.getItem('token') 
        }));

        // Retry the original request
        result = await baseQuery(args, api, extraOptions);

      }

    } else {
      console.log('ddd 333');

      api.dispatch(logout());
      return;

    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
















