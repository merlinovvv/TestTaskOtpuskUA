import { createApi } from "@reduxjs/toolkit/query/react";
import { getCountries } from "../lib/api";
import type { CountriesMap } from "../types/api";
import { customBaseQuery } from "../lib/customBaseQuery";

export const countriesApi = createApi({
  reducerPath: "countries",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesMap, string | number | void>({
      query: () => ({ fn: getCountries }),
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
