import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, updateAccessToken } from "../features/slice/auth/authSlice";

// let api_url = "http://54.146.252.18:5000";
const api_url = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  credentials: "include", // Sends HttpOnly cookies automatically
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  // Prevent infinite loop
  if (
    typeof args === "object" &&
    args.url === "/api/v1/auth/refresh-token"
  ) {
    api.dispatch(logout());
    return result;
  }

  // If another refresh is already running
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve,
        reject,
      });
    }).then(async () => {
      return await baseQuery(args, api, extraOptions);
    });
  }

  isRefreshing = true;

  try {
    const refreshResult = await axios.post(
      `${api_url}/api/v1/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log('refreshResult ', refreshResult)

    const newAccessToken = refreshResult.data.data.accessToken;

    api.dispatch(
      updateAccessToken(newAccessToken)
    );

    processQueue(null, newAccessToken);

    result = await baseQuery(args, api, extraOptions);
  } catch (error) {
    processQueue(error, null);

    api.dispatch(logout());
  } finally {
    isRefreshing = false;
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});