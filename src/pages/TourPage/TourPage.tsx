import { useGetHotelQuery, useGetPriceQuery } from "../../services/tourApi";
import { useParams } from "react-router-dom";
import { TourCard } from "../../features/TourCard/TourCard";
import { LoaderCircle } from "lucide-react";

export default function TourPage() {
  const { priceId, hotelId } = useParams();
  const { data: priceData, isLoading: isLoadingPrice } = useGetPriceQuery(
    priceId,
    { skip: !priceId },
  );
  const { data: hotelData, isLoading: isLoadingHotel } = useGetHotelQuery(
    hotelId,
    { skip: !hotelId },
  );

  return isLoadingHotel || isLoadingPrice ? (
    <LoaderCircle
      size={46}
      className="animate-spin mx-auto text-primary mt-10"
    />
  ) : priceData && hotelData ? (
    <TourCard hotel={hotelData} price={priceData} />
  ) : null;
}
