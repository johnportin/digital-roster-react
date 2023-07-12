import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (preSlug: string) => {
  return preSlug
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const getBaseUrl = () => {
  // Is this the right production URL?
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://digital-roster-react.vercel.app';
};
