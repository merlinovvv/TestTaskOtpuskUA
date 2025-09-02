import { createApi } from "@reduxjs/toolkit/query/react";
import { getHotel, getPrice } from "../lib/api";
import type { Hotel, PriceOffer } from "../types/api";
import { customBaseQuery } from "../lib/customBaseQuery";

export const tourApi = createApi({
  reducerPath: "tour",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getPrice: builder.query<PriceOffer, string | number | void>({
      query: (priceId) => ({ fn: getPrice, args: [priceId] }),
      keepUnusedDataFor: 300,
    }),
    getHotel: builder.query<Hotel, string | number | void>({
      query: (hotelId) => {
        return { fn: getHotel, args: [Number(hotelId)] };
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetPriceQuery, useGetHotelQuery } = tourApi;
