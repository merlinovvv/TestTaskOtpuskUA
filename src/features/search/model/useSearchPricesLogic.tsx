import { type Dispatch, Fragment, type SetStateAction, useEffect, useState } from "react";
import type { GeoEntity } from "../../../types/api";
import { useGetCountriesQuery } from "../../../services/countriesApi";
import { useSearchGeoQuery } from "../../../services/searchGeoApi";
import {
  startSearchPricesApi,
  useStartSearchPricesQuery,
  useStopSearchPricesMutation,
} from "../../../services/startSearchPricesApi";
import { Hotel as HotelIcon, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";

export function useSearchPricesLogic({ setRequestIdSearch }: { setRequestIdSearch: Dispatch<SetStateAction<string>> }) {
  const [enabledFetchCountries, setEnabledFetchCountries] = useState(false);
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [dropdownOptions, setDropdownOptions] = useState<GeoEntity[]>([]);
  const [countryId, setCountryId] = useState("");
  const dispatch = useDispatch();
  const { isGlobalLoadingSearch } = useSelector((s: RootState) => s.search);

  // страны
  const { data: countriesData, isFetching: isLoadingCountries } = useGetCountriesQuery(undefined, {
    skip: !enabledFetchCountries,
  });

  // страны / города / отели
  const { data: serachGeoData, isFetching: isLoadingGeoData } = useSearchGeoQuery(searchValue, {
    skip: !searchValue,
  });

  // получаем токен
  const { data: tokenData, error: errorSearchPrices } = useStartSearchPricesQuery(countryId, {
    skip: !countryId,
  });
  const [stopSearch] = useStopSearchPricesMutation(); // останавливаем поиск (удаляем токен)

  // шаблон для вывода данных в дропдауне
  function findItemTemplate(e: GeoEntity) {
    if (e?.type === "country" || !e?.type) {
      return (
        <Fragment>
          <img className="max-w-[30px] rounded-sm" src={e.flag} alt={e.name} />
          {e.name}
        </Fragment>
      );
    }

    if (e?.type === "city") {
      return (
        <Fragment>
          <MapPin />
          {e.name}
        </Fragment>
      );
    }

    if (e?.type === "hotel") {
      return (
        <Fragment>
          <HotelIcon />
          {e.name}
        </Fragment>
      );
    }
  }

  // отправляем выбранное countryId
  async function handleSubmit(values: { selectedSearch: SetStateAction<string> }) {
    // если загрузка и есть токен, значит можно останавливать токен и удалять из кеша
    if (isGlobalLoadingSearch && tokenData?.token) {
      dispatch(startSearchPricesApi.util.invalidateTags([{ type: "StartSearch", id: countryId }]));
      await stopSearch(tokenData?.token);
    }

    setCountryId(values.selectedSearch);
  }

  useEffect(() => {
    setDropdownOptions(Object.entries((searchValue ? serachGeoData : countriesData) || {})?.map(([_, value]) => value));
  }, [searchValue, serachGeoData, countriesData]);

  useEffect(() => {
    setRequestIdSearch(countryId ?? "");
  }, [countryId, setRequestIdSearch]);

  return {
    setEnabledFetchCountries,
    setSearchValue,
    setCountryId,

    isLoadingCountries,
    isLoadingGeoData,

    errorSearchPrices,
    dropdownOptions,
    searchValue,
    countryId,

    findItemTemplate,
    handleSubmit,
  };
}
