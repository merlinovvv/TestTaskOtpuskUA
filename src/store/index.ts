import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../services/countriesApi";
import { searchGeoApi } from "../services/searchGeoApi";
import { startSearchPricesApi } from "../services/startSearchPricesApi";

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    [searchGeoApi.reducerPath]: searchGeoApi.reducer,
    [startSearchPricesApi.reducerPath]: startSearchPricesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(searchGeoApi.middleware)
      .concat(startSearchPricesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
