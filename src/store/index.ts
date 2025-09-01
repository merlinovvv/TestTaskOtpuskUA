import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../services/countriesApi";
import { searchGeoApi } from "../services/searchGeoApi";

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    [searchGeoApi.reducerPath]: searchGeoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(searchGeoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
