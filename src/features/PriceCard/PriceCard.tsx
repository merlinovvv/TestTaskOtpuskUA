import type { Hotel, PriceOffer } from "../../types/api";
import { Calendar, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export default function PriceCard(props: Hotel & PriceOffer) {
  console.log(props);
  return (
    <div className="price-card flex flex-col gap-2">
      <img className="rounded-md" src={props?.img} alt={props?.name} />
      <h3 className="text-lg font-bold">{props?.name}</h3>
      <div className="flex gap-2 items-end">
        <Globe />{" "}
        <p>
          {props?.countryName}, {props?.cityName}
        </p>
      </div>
      <div className="flex gap-2 items-end">
        <Calendar />
        <p>
          <time dateTime={props?.startDate}>
            {new Date(props?.startDate)?.toLocaleDateString()}
          </time>{" "}
          -{" "}
          <time dateTime={props?.endDate}>
            {new Date(props?.endDate)?.toLocaleDateString()}
          </time>
        </p>
      </div>
      <p className="uppercase text-lg font-bold">
        {props?.amount} {props?.currency}
      </p>
      <Link
        className="text-primary font-semibold"
        to={`/tour/${props?.id}/${props?.hotelID}`}
      >
        Детальніше
      </Link>
    </div>
  );
}
