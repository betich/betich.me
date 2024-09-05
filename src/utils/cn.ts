import { twMerge } from "tailwind-merge";

export default function cn(...classes: (string | undefined)[]) {
  return twMerge(classes.filter(Boolean) as string[]);
}
