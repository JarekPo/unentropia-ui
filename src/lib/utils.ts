import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstName = (fullName: string) => {
  if (fullName) {
    if (typeof fullName !== 'string') return '';
    const nameParts = fullName.trim().split(/\s+/);
    return nameParts[0] || '';
  }
  return '';
};
