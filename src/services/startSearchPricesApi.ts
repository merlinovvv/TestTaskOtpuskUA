import { createApi } from "@reduxjs/toolkit/query/react";
import { getHotels, getSearchPrices, startSearchPrices } from "../lib/api";
import { customBaseQuery } from "../lib/customBaseQuery";

export const startSearchPricesApi = createApi({
  reducerPath: "prices",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    startSearchPrices: builder.query({
      query: (countryId) => ({ fn: startSearchPrices, args: [countryId] }),
      keepUnusedDataFor: 300,
    }),
    getPrices: builder.query({
      query: (token) => ({ fn: getSearchPrices, args: [token] }),
      keepUnusedDataFor: 300,
    }),
    getHotels: builder.query({
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
