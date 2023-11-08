import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { empltySplitApi } from "./services/emptySplitApi";

export const store = configureStore({
    reducer: {
        [empltySplitApi.reducerPath]: empltySplitApi.reducer
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware().concat(empltySplitApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;