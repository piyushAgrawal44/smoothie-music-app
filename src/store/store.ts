import { configureStore } from "@reduxjs/toolkit";
import musicPlayerReducer from "./storeSlice";

export const store = configureStore({
    reducer: {
        musicPlayer: musicPlayerReducer,
    },
});

// Types for Redux state & dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
