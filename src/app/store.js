import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../services/baseApi';
import authReducer from '../features/slice/auth/authSlice';
import userReducer from '../features/slice/userSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer =  persistReducer(persistConfig, userReducer)
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    userDashboard: persistedUserReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware)
});

export const persistor = persistStore(store);
