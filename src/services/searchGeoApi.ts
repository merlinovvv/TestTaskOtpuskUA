import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { searchGeo } from "../lib/api";
import type { GeoResponse } from "../types/api";

export const searchGeoApi = createApi({
  reducerPath: "searchGeoApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    searchGeo: builder.query<GeoResponse, string | number | void>({
      async queryFn(query) {
        console.log(query);
        try {
          const res = await searchGeo(query);
          const data = await res.json();
          return { data };
        } catch (err: unknown) {
          return { error: { status: 500, data: err } };
        }
      },
    }),
  }),
});

export const { useSearchGeoQuery } = searchGeoApi;
