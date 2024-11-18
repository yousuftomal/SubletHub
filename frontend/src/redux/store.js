import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adReducer from './slices/adSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    ads: adReducer,
  },
});

export default store;
