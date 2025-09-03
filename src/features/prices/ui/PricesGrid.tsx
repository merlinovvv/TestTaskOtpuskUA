import PriceCard from "./PriceCard";
import { Loader } from "../../../ui/Loader";
import ErrorMessage from "../../../ui/ErrorMessage";
import { usePricesListLogic } from "../model/usePricesListLogic";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

function EmptyMessage() {
  return <p className="text-center mt-10">За вашим запитом турів не знайдено</p>;
}

export default function PricesGrid({ requestIdSearch }: { requestIdSearch: string }) {
  const { prices, pricesError, hotelsData, hotelsError } = usePricesListLogic({ requestIdSearch });
  const { isGlobalLoadingSearch } = useSelector((s: RootState) => s.search);
  return (
    <>
      {isGlobalLoadingSearch && <Loader />}
      {pricesError && !isGlobalLoadingSearch && <ErrorMessage error={pricesError} />}
      {hotelsError && !isGlobalLoadingSearch && <ErrorMessage error={hotelsError} />}
      {!isGlobalLoadingSearch && !pricesError && !hotelsError && requestIdSearch && prices.length === 0 && (
        <EmptyMessage />
      )}
      {!!hotelsData && !!prices && !isGlobalLoadingSearch && (
        <div
          className="grid gap-4 max-w-[700px] mx-auto justify-items-center mt-10"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {prices.map(
            (offer) =>
              hotelsData[offer.hotelID] && <PriceCard hotel={hotelsData[offer.hotelID]} offer={offer} key={offer?.id} />
          )}
        </div>
      )}
    </>
  );
}
