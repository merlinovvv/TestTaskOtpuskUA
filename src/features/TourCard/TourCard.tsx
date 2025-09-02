import type { Hotel, PriceOffer } from "../../types/api";
import {
  SquareParking,
  Volleyball,
  WashingMachine,
  WavesLadder,
  Wifi,
} from "lucide-react";
import { formatMoney } from "../../lib/utils";
import DatePeriod from "../../ui/DatePeriod";
import { HotelInfoCard } from "../../ui/HotelInfoCard";

type Services = {
  wifi: "yes" | "none";
  aquapark: "yes" | "none";
  tennis_court: "yes" | "none";
  laundry: "yes" | "none";
  parking: "yes" | "none";
};

const servicesAsIcons = {
  wifi: <Wifi />,
  aquapark: <WavesLadder />,
  tennis_court: <Volleyball />,
  laundry: <WashingMachine />,
  parking: <SquareParking />,
} as const;

const servicesAsNames = {
  wifi: "Wi-Fi",
  aquapark: "Аквапарк",
  tennis_court: "Тенісний корт",
  laundry: "Пральня",
  parking: "Паркінг",
} as const;

type ServiceKey = keyof typeof servicesAsIcons;

export function TourCard({
  hotel,
  price,
}: {
  hotel: Hotel & { description?: string; services?: Services };
  price: PriceOffer;
}) {
  const { services } = hotel;
  const { startDate, endDate, currency, amount } = price;
  const servicesList = Object.entries(services ?? {}) as [
    ServiceKey,
    "yes" | "none",
  ][];

  return (
    <section className="card max-w-[350px] mx-auto mt-10 flex flex-col gap-3">
      <HotelInfoCard hotel={hotel} />

      {hotel.description && (
        <div>
          <h5 className="text-lg font-semibold mb-1">Опис</h5>
          <p className="text-sm">{hotel.description}</p>
        </div>
      )}
      <div>
        <h5 className="text-lg font-semibold mb-1">Сервіси</h5>
        <p className="flex items-center gap-3 flex-wrap text-sm">
          {servicesList
            .filter(([_, value]) => value === "yes")
            .map(([key]) => (
              <span className="flex gap-2 items-center" key={key}>
                {servicesAsIcons[key]} {servicesAsNames[key]}
              </span>
            ))}
        </p>
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-2"></div>
      <DatePeriod endDate={endDate} startDate={startDate} />
      <p className="text-lg font-bold">{formatMoney(amount, currency)}</p>
    </section>
  );
}
