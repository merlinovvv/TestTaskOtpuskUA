import SearchCard from "../../features/search/ui/SearchCard.tsx";
import PricesGrid from "../../features/prices/ui/PricesGrid";
import { useState } from "react";

export default function SearchPage() {
  const [requestIdSearch, setRequestIdSearch] = useState("");

  return (
    <>
      <SearchCard setRequestIdSearch={setRequestIdSearch} />
      <PricesGrid requestIdSearch={requestIdSearch} />
    </>
  );
}
