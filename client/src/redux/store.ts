import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { empltySplitApi } from "./services/emptySplitApi";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [empltySplitApi.reducerPath]: empltySplitApi.reducer
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware().concat(empltySplitApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;