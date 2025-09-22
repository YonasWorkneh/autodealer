import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number | string) =>
  Intl.NumberFormat("en-us", { style: "currency", currency: "ETB" }).format(
    typeof price === "number" ? price : parseFloat(price)
  );
