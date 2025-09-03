import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../services/countriesApi";
import { searchGeoApi } from "../services/searchGeoApi";
import { startSearchPricesApi } from "../services/startSearchPricesApi";
import { tourApi } from "../services/tourApi";
import searchReducer from "../features/search/model/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [searchGeoApi.reducerPath]: searchGeoApi.reducer,
    [startSearchPricesApi.reducerPath]: startSearchPricesApi.reducer,
    [tourApi.reducerPath]: tourApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(searchGeoApi.middleware)
      .concat(startSearchPricesApi.middleware)
      .concat(tourApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
