import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCountries } from "../lib/api";
import type { CountriesMap } from "../types/api";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesMap, void>({
      async queryFn() {
        try {
          const res = await getCountries();
          const data = await res.json();
          return { data };
        } catch (err: unknown) {
          return { error: { status: 500, data: err } };
        }
      },
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
