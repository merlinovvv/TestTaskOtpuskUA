import type { Hotel, PriceOffer } from "../../types/api";
import { Link } from "react-router-dom";
import { formatMoney } from "../../lib/utils";
import DatePeriod from "../../ui/DatePeriod";
import { HotelInfoCard } from "../../ui/HotelInfoCard";

export default function PriceCard({
  hotel,
  offer,
}: {
  hotel: Hotel;
  offer: PriceOffer;
}) {
  return (
    <div className="card flex flex-col gap-3">
      <HotelInfoCard hotel={hotel} />
      <DatePeriod endDate={offer.endDate} startDate={offer.startDate} />
      <p className="text-lg font-bold">
        {formatMoney(offer.amount, offer.currency)}
      </p>
      <Link
        className="text-primary font-semibold"
        to={`/tour/${offer.id}/${hotel.id}`}
      >
        Детальніше
      </Link>
    </div>
  );
}
