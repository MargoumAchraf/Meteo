/**
 * Turns a date string ("2026-08-18") into a display label,
 * showing "Today" for the current date and a short weekday name
 * for the rest (matches the mockup: Today, Tue, Wed, Thu...).
 */
export function getDayLabel(dateStr: string): string {
  const todayStr = new Date().toISOString().split("T")[0]; // "2026-08-18"

  if (dateStr === todayStr) return "Today";

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" }); // "Tue"
}