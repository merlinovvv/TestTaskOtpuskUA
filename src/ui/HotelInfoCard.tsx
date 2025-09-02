import { MapPin, Building2 } from "lucide-react";
import type { Hotel } from "../types/api";

export function HotelInfoCard({ hotel }: { hotel: Hotel }) {
  return (
    <>
      <h2 className="text-xl font-bold">{hotel.name}</h2>
      <div className="flex gap-4 items-center">
        <p className="flex gap-1 items-center">
          <MapPin />
          {hotel.countryName}
        </p>
        <p className="flex gap-1 items-center">
          <Building2 />
          {hotel.cityName}
        </p>
      </div>
      <img className="rounded-md" src={hotel.img} alt={hotel.name} />
    </>
  );
}
