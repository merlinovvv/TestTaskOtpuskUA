import Dropdown from "../../ui/Dropdown/Dropdown.tsx";
import Button from "../../ui/Button/Button.tsx";
import { Form, Formik } from "formik";
import { useGetCountriesQuery } from "../../services/countriesApi";
import { Fragment, useEffect, useState } from "react";
import { useSearchGeoQuery } from "../../services/searchGeoApi";
import type { GeoEntity } from "../../types/api";
import { Hotel, MapPin } from "lucide-react";

export default function SearchCard() {
  const [enabledFetch, setEnabledFetch] = useState(false);
  const [searchValue, setSearchValue] = useState<number | string>("");
  const [dropdownOptions, setDropdownOptions] = useState<GeoEntity[]>([]);
  const { data: countriesData, isFetching: isLoadingCountries } =
    useGetCountriesQuery(undefined, { skip: !enabledFetch });
  const { data: serachGeoData, isFetching: isLoadingGeoData } =
    useSearchGeoQuery(searchValue, {
      skip: !searchValue,
    });

  function handleSubmit(values: { selectedSearch: string }) {
    console.log(values);
  }

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
          <Hotel />
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

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ selectedSearch: "" }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="bg-card rounded-lg border border-gray-400 p-[25px] mx-auto max-w-[350px] mt-10 flex flex-col gap-2">
          <Dropdown<GeoEntity>
            name="selectedSearch"
            loading={isLoadingCountries || isLoadingGeoData}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onOpen={() => setEnabledFetch(true)}
            onClose={() => setEnabledFetch(false)}
            options={dropdownOptions}
            optionTemplate={findItemTemplate}
            onSelect={(val) =>
              setFieldValue("selectedSearch", (val as GeoEntity | null)?.id)
            }
          />
          <Button className="w-full" type="submit">
            Знайти
          </Button>
        </Form>
      )}
    </Formik>
  );
}
