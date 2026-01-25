import { DateTime, Duration } from 'luxon';

export interface TripDateTime {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  timezone: string; // IANA timezone string
}

export interface TripDurationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
  formatted: string;
}

/**
 * Calculates the duration between departure and arrival.
 * Luxon handles DST and timezone offsets automatically when using IANA zones.
 */
export function calculateTripDuration(
  departure: TripDateTime,
  arrival: TripDateTime
): TripDurationResult {
  const depDt = DateTime.fromISO(`${departure.date}T${departure.time}`, { zone: departure.timezone });
  const arrDt = DateTime.fromISO(`${arrival.date}T${arrival.time}`, { zone: arrival.timezone });

  if (!depDt.isValid || !arrDt.isValid) {
    throw new Error('Invalid departure or arrival date/time');
  }

  const diff = arrDt.diff(depDt, ['hours', 'minutes']);
  const hours = Math.floor(diff.hours);
  const minutes = Math.floor(diff.minutes);
  const totalMinutes = Math.floor(arrDt.diff(depDt, 'minutes').minutes);

  // Handle negative duration (arrival before departure)
  if (totalMinutes < 0) {
    return {
      hours: 0,
      minutes: 0,
      totalMinutes: 0,
      formatted: 'Whoops! Arrival cannot be before departure.'
    };
  }

  const hoursLabel = hours === 1 ? 'hour' : 'hours';
  const minutesLabel = minutes === 1 ? 'minute' : 'minutes';
  
  let formatted = '';
  if (hours > 0) {
    formatted += `${hours} ${hoursLabel}`;
  }
  if (minutes > 0) {
    if (formatted) formatted += ' ';
    formatted += `${minutes} ${minutesLabel}`;
  }
  if (hours === 0 && minutes === 0) {
    formatted = '0 minutes';
  }

  return {
    hours,
    minutes,
    totalMinutes,
    formatted
  };
}
