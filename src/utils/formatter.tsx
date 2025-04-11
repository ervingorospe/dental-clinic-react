import { format } from 'date-fns';

export const formattedDate = (date: string) => {
  const parsedDate = new Date(date);
  return format(parsedDate, 'MMMM dd, yyyy');
};