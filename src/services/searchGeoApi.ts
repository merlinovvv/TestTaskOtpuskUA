import { createApi } from "@reduxjs/toolkit/query/react";
import { searchGeo } from "../lib/api";
import type { GeoResponse } from "../types/api";
import { customBaseQuery } from "../lib/customBaseQuery";

export const searchGeoApi = createApi({
  reducerPath: "geo",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    searchGeo: builder.query<GeoResponse, string | number | void>({
      query: (query) => ({ fn: searchGeo, args: [query] }),
    }),
  }),
});

export const { useSearchGeoQuery } = searchGeoApi;
