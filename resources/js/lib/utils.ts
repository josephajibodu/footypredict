import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toMoney(amount: number, currency: string = "NGN", locale: string = "en-NG") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function extractErrorMessage(error: any): string|null {
  if (error && typeof error === "object") {
    // Check if the error object is indexed numerically (e.g., {0: "message"})
    if (Object.keys(error).every((key) => !isNaN(Number(key)))) {
      const firstKey = Object.keys(error)[0];
      return error[firstKey];
    }

    // Check if the error object is keyed by fields (e.g., {"amount": "message"})
    if (Object.keys(error).some((key) => isNaN(Number(key)))) {
      const firstKey = Object.keys(error)[0];
      return error[firstKey];
    }
  }

  return null;
}