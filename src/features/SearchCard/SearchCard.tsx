import Dropdown from "../../ui/Dropdown/Dropdown.tsx";
import Button from "../../ui/Button/Button.tsx";
import { Form, Formik } from "formik";
import { useGetCountriesQuery } from "../../services/countriesApi";
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSearchGeoQuery } from "../../services/searchGeoApi";
import type { City, Country, GeoEntity, Hotel } from "../../types/api";
import { MapPin, Hotel as HotelIcon } from "lucide-react";
import { useStartSearchPricesQuery } from "../../services/startSearchPricesApi";

export default function SearchCard({
  setRequestIdSearch,
}: {
  setRequestIdSearch: Dispatch<SetStateAction<string>>;
}) {
  const [enabledFetch, setEnabledFetch] = useState(false);
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [dropdownOptions, setDropdownOptions] = useState<GeoEntity[]>([]);
  const [countryId, setCountryId] = useState("");

  const { data: countriesData, isFetching: isLoadingCountries } =
    useGetCountriesQuery(undefined, { skip: !enabledFetch });
  const { data: serachGeoData, isFetching: isLoadingGeoData } =
    useSearchGeoQuery(searchValue, {
      skip: !searchValue,
    });
  const { isLoading: isLoadingSearchPrices, error: errorSearchPrices } =
    useStartSearchPricesQuery(countryId, { skip: !countryId });

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

  useEffect(() => {
    setDropdownOptions(
      Object.entries((searchValue ? serachGeoData : countriesData) || {})?.map(
        ([_, value]) => value,
      ),
    );
  }, [searchValue, serachGeoData, countriesData]);

  useEffect(() => {
    setRequestIdSearch(countryId ?? "");
  }, [countryId, setRequestIdSearch]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ selectedSearch: "" }}
      onSubmit={async ({ selectedSearch }) => {
        setCountryId(selectedSearch);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="search-card flex flex-col gap-2">
          <Dropdown<GeoEntity>
            name="selectedSearch"
            loading={isLoadingCountries || isLoadingGeoData}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onOpen={() => setEnabledFetch(true)}
            onClose={() => setEnabledFetch(false)}
            options={dropdownOptions}
            optionTemplate={findItemTemplate}
            onSelect={(item) =>
              setFieldValue(
                "selectedSearch",
                !item?.type || item?.type === "country"
                  ? (item as Country)?.id
                  : (item as City | Hotel)?.countryId || null,
              )
            }
          />
          <Button
            disabled={!values.selectedSearch}
            loading={isLoadingSearchPrices}
            className="w-full"
            type="submit"
          >
            Знайти
          </Button>
          {errorSearchPrices?.message && (
            <p className="text-red-500 text-center">
              {errorSearchPrices?.message}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
}
