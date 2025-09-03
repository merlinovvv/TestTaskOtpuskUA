/**
 * Combines multiple classes into one string
 * @param classes - string list, undefined, null or objects { className: condition }
 * @returns string with classNames
 */
export function cn(...classes: Array<string | undefined | null | false | Record<string, boolean>>): string {
  return classes
    .flatMap((c) => {
      if (!c) return [];
      if (typeof c === "string") return [c];
      if (typeof c === "object") {
        return Object.entries(c)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}

/**
 * Format date.
 * yyyy-mm-dd -> dd-mm-yyy
 *
 * @param date sum
 */
export function formatDate(date: string) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

/**
 * Format number in money.
 * 1500 -> "1 500 USD"
 *
 * @param amount sum
 * @param currency code currency ("usd" | "uah" | "eur")
 * @param locale "uk-UA"
 */
export function formatMoney(amount: number, currency: string, locale: string = "uk-UA"): string {
  return `${amount.toLocaleString(locale)} ${currency.toUpperCase()}`;
}
