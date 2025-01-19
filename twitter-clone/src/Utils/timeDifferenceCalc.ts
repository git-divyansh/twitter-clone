import { parseISO, differenceInSeconds } from 'date-fns';

export function calculateDifference(backendDateTime: string): string | null {
  if (!backendDateTime) return null;

  const localDateTimeFromTs = new Date();
  const tsDate = localDateTimeFromTs;
  const backendDate = parseISO(backendDateTime);

  // Total difference in seconds
  let totalSeconds = Math.abs(differenceInSeconds(tsDate, backendDate));

  // Calculate each unit
  const years = Math.floor(totalSeconds / (3600 * 24 * 365));
  if (years >= 1) return `${years} year(s)`;

  const months = Math.floor(totalSeconds / (3600 * 24 * 30));
  if (months >= 1) return `${months} month(s)`;

  const days = Math.floor(totalSeconds / (3600 * 24));
  if (days >= 1) return `${days} day(s)`;

  const hours = Math.floor(totalSeconds / 3600);
  if (hours >= 1) return `${hours} hour(s)`;

  const minutes = Math.floor(totalSeconds / 60);
  if (minutes >= 1) return `${minutes} minute(s)`;

  const seconds = totalSeconds % 60;
  return `${seconds} second(s)`;
}
