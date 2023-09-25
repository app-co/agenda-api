import { isWithinInterval } from 'date-fns';

export function convertHourToMinuts() {}

export function isInterval(
  date: Date | number,
  start: Date | number,
  end: Date | number,
) {
  const interval = isWithinInterval(date, { start, end });

  return interval;
}
