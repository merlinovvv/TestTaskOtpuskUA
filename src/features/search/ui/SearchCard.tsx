import Dropdown from "../../../ui/Dropdown.tsx";
import Button from "../../../ui/Button.tsx";
import { Form, Formik } from "formik";
import { type Dispatch, type SetStateAction } from "react";
import type { City, Country, GeoEntity, Hotel } from "../../../types/api";
import { useSearchPricesLogic } from "../model/useSearchPricesLogic";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

export default function SearchCard({ setRequestIdSearch }: { setRequestIdSearch: Dispatch<SetStateAction<string>> }) {
  const {
    setEnabledFetchCountries,
    setSearchValue,
    isLoadingCountries,
    isLoadingGeoData,
    errorSearchPrices,
    dropdownOptions,
    searchValue,
    countryId,
    findItemTemplate,
    handleSubmit,
  } = useSearchPricesLogic({ setRequestIdSearch });
  const { isGlobalLoadingSearch } = useSelector((s: RootState) => s.search);

  return (
    <Formik enableReinitialize={true} initialValues={{ selectedSearch: "" }} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form className="search-card flex flex-col gap-2">
          <Dropdown<GeoEntity>
            name="selectedSearch"
            loading={isLoadingCountries || isLoadingGeoData}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onOpen={() => setEnabledFetchCountries(true)}
            onClose={() => setEnabledFetchCountries(false)}
            options={dropdownOptions}
            optionTemplate={findItemTemplate}
            onSelect={(item) =>
              setFieldValue(
                "selectedSearch",
                !item?.type || item?.type === "country"
                  ? (item as Country)?.id
                  : (item as City | Hotel)?.countryId || null
              )
            }
          />
          <Button
            disabled={!values.selectedSearch}
            loading={isGlobalLoadingSearch && countryId == values.selectedSearch && !!values.selectedSearch}
            className="w-full"
            type="submit"
          >
            Знайти
          </Button>
          {errorSearchPrices?.message && <p className="text-red-500 text-center">{errorSearchPrices?.message}</p>}
        </Form>
      )}
    </Formik>
  );
}
