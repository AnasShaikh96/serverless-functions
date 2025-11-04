import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // 'en-GB' gives dd/mm/yyyy format
}
