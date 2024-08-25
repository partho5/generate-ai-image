import { configureStore } from '@reduxjs/toolkit';
import generatedImageReducer from './slices/generatedImageSlice';

export const store = configureStore({
    reducer: {
        generatedImage: generatedImageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
