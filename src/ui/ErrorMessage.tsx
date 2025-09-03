export default function ErrorMessage({ error }: { error?: any }) {
  if (!error) return null;
  return <p className="text-red-500 text-center">{error.message || error.data || "Невідома помилка"}</p>;
}
