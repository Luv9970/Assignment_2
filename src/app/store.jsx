import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/crypto/counterSlice';

export const store = configureStore({
  reducer: {
    counter : counterReducer,
  },
});
