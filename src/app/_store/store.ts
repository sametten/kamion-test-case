'user client'

import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import shipmentSliceReducer from './shipmentSlice';

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        shipment: shipmentSliceReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


