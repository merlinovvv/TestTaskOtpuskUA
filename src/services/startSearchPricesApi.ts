import { createApi } from "@reduxjs/toolkit/query/react";
import { getHotels, getSearchPrices, startSearchPrices } from "../lib/api";
import { customBaseQuery } from "../lib/customBaseQuery";
import type { HotelsMap, PricesMap, StartSearchResponse } from "../types/api";

export const startSearchPricesApi = createApi({
  reducerPath: "prices",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    startSearchPrices: builder.query<
      StartSearchResponse,
      string | number | void
    >({
      query: (countryId) => ({ fn: startSearchPrices, args: [countryId] }),
      keepUnusedDataFor: 300,
    }),
    getPrices: builder.query<{ prices: PricesMap }, string | number | void>({
      query: (token) => ({ fn: getSearchPrices, args: [token] }),
      keepUnusedDataFor: 300,
    }),
    getHotels: builder.query<HotelsMap, string | number | void>({
      query: (countryId) => ({ fn: getHotels, args: [countryId] }),
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useStartSearchPricesQuery,
  useGetPricesQuery,
  useGetHotelsQuery,
} = startSearchPricesApi;
