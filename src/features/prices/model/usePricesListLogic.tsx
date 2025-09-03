import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetHotelsQuery,
  useGetPricesQuery,
  useStartSearchPricesQuery,
} from "../../../services/startSearchPricesApi";
import type { SerializedError } from "@reduxjs/toolkit";
import type { PriceOffer, StartSearchResponse } from "../../../types/api";
import { setIsGlobalLoadingSearch } from "../../search/model/searchSlice";

export function usePricesListLogic({ requestIdSearch }: { requestIdSearch: string }) {
  const dispatch = useDispatch();
  const [attemptLoading, setAttemptLoading] = useState(false); // статус загрузки пока идут ретраи
  const [prices, setPrices] = useState<PriceOffer[]>([]); // стейт для списка цен
  const startResult = useStartSearchPricesQuery(requestIdSearch); // токен

  // получаем цены
  const {
    data: pricesData,
    refetch: getPrices,
    error: pricesError,
    isFetching: isLoadingPrices,
  } = useGetPricesQuery(startResult.data?.token, {
    skip: !startResult.data?.token,
  });

  // получаем отели
  const {
    data: hotelsData,
    error: hotelsError,
    isFetching: isLoadingHotels,
  } = useGetHotelsQuery(requestIdSearch, {
    skip: !requestIdSearch,
  });

  // делаем ретраи
  useEffect(() => {
    if (!startResult.data?.token || !startResult.data?.waitUntil) return;

    const attemptFetch = async (retriesLeft: number, waitUntil: string) => {
      setAttemptLoading(true);
      const ms = new Date(waitUntil).getTime() - Date.now(); // рассчитываем время задержки
      await new Promise((r) => setTimeout(r, Math.max(ms, 0))); // задерживаем

      await getPrices().finally(() => setAttemptLoading(false)); // получаем цены

      // следим за ошибками
      if (pricesError) {
        const err: SerializedError & {
          status?: number;
          data?: StartSearchResponse | string;
        } = pricesError;

        // если ошибка не 425 и пока есть попытки пробуем еще раз
        if (retriesLeft > 0 && err.status !== 425) {
          await attemptFetch(retriesLeft - 1, waitUntil);
        }

        // если 425 и дали новый waitUntil, то пробуем еще раз
        if (err.status === 425 && (err?.data as StartSearchResponse)?.waitUntil) {
          await attemptFetch(retriesLeft, (err?.data as StartSearchResponse)?.waitUntil);
        }
      }
    };

    attemptFetch(2, startResult.data.waitUntil);
  }, [startResult.data?.waitUntil, getPrices, pricesError, startResult.data?.token]);

  // обновляем глобальный isLoading
  useEffect(() => {
    dispatch(setIsGlobalLoadingSearch(attemptLoading || isLoadingPrices || isLoadingHotels || startResult.isLoading));
  }, [attemptLoading, isLoadingPrices, isLoadingHotels, startResult.isLoading, dispatch]);

  // сортируем по цене по возрастанию
  useEffect(() => {
    if (pricesData?.prices) {
      setPrices(
        Object.entries(pricesData.prices || {})
          ?.map(([_, value]) => value)
          ?.sort((a, b) => a.amount - b.amount) || []
      );
    }
  }, [pricesData]);

  return {
    prices,
    pricesError,
    hotelsData,
    hotelsError,
  };
}
