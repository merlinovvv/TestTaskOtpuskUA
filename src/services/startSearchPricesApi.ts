import { createApi } from "@reduxjs/toolkit/query/react";
import { getHotels, getSearchPrices, startSearchPrices, stopSearchPrices } from "../lib/api";
import { customBaseQuery } from "../lib/customBaseQuery";
import type { HotelsMap, PricesMap, StartSearchResponse, StopSearchResponse } from "../types/api";

export const startSearchPricesApi = createApi({
  reducerPath: "prices",
  baseQuery: customBaseQuery(),
  tagTypes: ["StartSearch", "StopSearchPrices", "Prices", "Hotels"],
  endpoints: (builder) => ({
    startSearchPrices: builder.query<StartSearchResponse, string | number | void>({
      query: (countryId) => ({ fn: startSearchPrices, args: [countryId] }),
      providesTags: (result, error, countryId) =>
        result ? [{ type: "StartSearch" as const, id: countryId }] : [{ type: "StartSearch" as const, id: "LIST" }],
    }),
    stopSearchPrices: builder.mutation<StopSearchResponse, string | number | void>({
      query: (token) => ({ fn: stopSearchPrices, args: [token] }),
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

export const { useStartSearchPricesQuery, useStopSearchPricesMutation, useGetPricesQuery, useGetHotelsQuery } =
  startSearchPricesApi;
