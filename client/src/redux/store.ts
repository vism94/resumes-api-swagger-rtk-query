// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { resumeApi } from '../services/resumeApi';

export const store = configureStore({
  reducer: {
    [resumeApi.reducerPath]: resumeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resumeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;