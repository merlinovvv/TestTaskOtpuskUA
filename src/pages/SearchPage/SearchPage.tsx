import SearchCard from "../../features/SearchCard/SearchCard.tsx";
import { useEffect, useState } from "react";
import {
  startSearchPricesApi,
  useGetHotelsQuery,
  useGetPricesQuery,
} from "../../services/startSearchPricesApi";
import { useSelector } from "react-redux";
import PriceCard from "../../features/PriceCard/PriceCard";
import type { PriceOffer, StartSearchResponse } from "../../types/api";
import { LoaderCircle } from "lucide-react";
import type { SerializedError } from "@reduxjs/toolkit";

export default function SearchPage() {
  const [requestIdSearch, setRequestIdSearch] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  const startResult = useSelector(
    startSearchPricesApi.endpoints.startSearchPrices.select(requestIdSearch),
  );
  const {
    data: pricesData,
    refetch: getPrices,
    error: pricesError,
    isFetching: isLoadingPrices,
  } = useGetPricesQuery(startResult?.data?.token, {
    skip: !startResult?.data?.token,
  });
  const {
    data: hotelsData,
    error: hotelsError,
    isFetching: isLoadingHotels,
  } = useGetHotelsQuery(requestIdSearch, {
    skip: !requestIdSearch,
  });

  useEffect(() => {
    if (!startResult.data?.token || !startResult.data?.waitUntil) return;

    const attemptFetch = async (retriesLeft: number, waitUntil: string) => {
      setCustomLoading(true);
      const ms = new Date(waitUntil).getTime() - Date.now();
      await new Promise((r) => setTimeout(r, Math.max(ms, 0)));

      await getPrices().finally(() => setCustomLoading(false));

      if (pricesError) {
        const err: SerializedError & {
          status?: number;
          data?: StartSearchResponse | string;
        } = pricesError;

        if (retriesLeft > 0 && err.status !== 425) {
          await attemptFetch(retriesLeft - 1, waitUntil);
        }

        if (
          err.status === 425 &&
          (err?.data as StartSearchResponse)?.waitUntil
        ) {
          await attemptFetch(
            retriesLeft,
            (err?.data as StartSearchResponse)?.waitUntil,
          );
        }
      }
    };

    attemptFetch(2, startResult.data.waitUntil);
  }, [
    startResult.data?.token,
    startResult.data?.waitUntil,
    getPrices,
    pricesError,
  ]);

  return (
    <div className="">
      <SearchCard setRequestIdSearch={setRequestIdSearch} />

      {customLoading ||
      isLoadingPrices ||
      startResult?.isLoading ||
      isLoadingHotels ? (
        <LoaderCircle
          size={46}
          className="animate-spin mx-auto text-primary mt-10"
        />
      ) : pricesError || hotelsError ? (
        <p className="text-red-500 text-center mt-10">
          {pricesError?.message || hotelsError?.message}
        </p>
      ) : Object.keys(pricesData?.prices || {})?.length === 0 &&
        !!requestIdSearch ? (
        <p className="text-center mt-10">За вашим запитом турів не знайдено</p>
      ) : (
        !!hotelsData &&
        !!pricesData && (
          <div
            className="grid gap-4 max-w-[700px] mx-auto justify-items-center mt-10"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {Object.entries(pricesData?.prices || {}).map(
              ([key, offer]: [string, PriceOffer]) => {
                return (
                  <PriceCard
                    hotel={hotelsData[offer.hotelID]}
                    offer={offer}
                    key={key}
                  />
                );
              },
            )}
          </div>
        )
      )}
    </div>
  );
}
