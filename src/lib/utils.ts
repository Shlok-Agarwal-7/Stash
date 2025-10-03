import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};

// Custom Error classes

export class UserExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserExistsError";
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}
