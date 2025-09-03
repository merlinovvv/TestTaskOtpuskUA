import { useGetHotelQuery, useGetPriceQuery } from "../../services/tourApi";
import { useParams } from "react-router-dom";
import { TourCard } from "../../features/tour/TourCard";
import { Loader } from "../../ui/Loader";

export default function TourPage() {
  const { priceId, hotelId } = useParams();
  const { data: priceData, isLoading: isLoadingPrice } = useGetPriceQuery(priceId, { skip: !priceId });
  const { data: hotelData, isLoading: isLoadingHotel } = useGetHotelQuery(hotelId, { skip: !hotelId });

  if (isLoadingHotel || isLoadingPrice) {
    return <Loader />;
  }

  return priceData && hotelData ? <TourCard hotel={hotelData} price={priceData} /> : null;
}
