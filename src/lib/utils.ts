import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes with clsx, resolving conflicts via tailwind-merge. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
