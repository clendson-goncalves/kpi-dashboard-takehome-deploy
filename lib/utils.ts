import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getMinMaxValues = (data: Record<string, any>[]): [number, number] => {
  const values = data.flatMap(item =>
    Object.values(item).filter((value): value is number => typeof value === 'number')
  );
  
  if (values.length === 0) return [0, 0];
  return [Math.min(...values), Math.max(...values)];
};
