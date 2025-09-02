import { Calendar } from "lucide-react";
import { formatDate } from "../lib/utils";

export default function DatePeriod({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return (
    <div className="flex gap-2 items-end">
      <Calendar />
      <p>
        <time dateTime={startDate}>{formatDate(startDate)}</time> -{" "}
        <time dateTime={endDate}>{formatDate(endDate)}</time>
      </p>
    </div>
  );
}
