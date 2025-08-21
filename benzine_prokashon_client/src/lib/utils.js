import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getDiscountedPrice = (book) => {
  if (!book.discountType || !book.discountValue) return book.listPrice;

  if (book.discountType === "percentage") {
    return Math.round(
      book.listPrice - (book.listPrice * book.discountValue) / 100
    );
  }

  if (book.discountType === "flat") {
    return Math.max(0, book.listPrice - book.discountValue);
  }

  return book.listPrice;
};

export const toBanglaNumber = (num) => {
  if (num === null || num === undefined) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (d) => banglaDigits[d]);
};
