import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adReducer from './slices/adSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    ads: adReducer,
    auth: authReducer,
  },
});

export default store;
