'use client';

import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { calculateTripDuration } from '../utils/duration';
import TripCard from './TripCard';
import DurationResult from './DurationResult';
import SubmitButton from './SubmitButton';

export default function TripForm() {
  const [departure, setDeparture] = useState({
    date: '',
    time: '',
    timezone: ''
  });
  
  const [arrival, setArrival] = useState({
    date: '',
    time: '',
    timezone: ''
  });

  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = DateTime.now();
    
    setDeparture({
      date: now.toISODate() || '',
      time: now.toFormat("HH:mm"),
      timezone: zone
    });

    setArrival({
      date: now.toISODate() || '',
      time: now.plus({ hours: 2 }).toFormat("HH:mm"),
      timezone: zone
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const durationResult = calculateTripDuration(departure, arrival);
      setResult(durationResult.formatted);
      
      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("Invalid date or time selected.");
    }
  };

  return (
    <>
      <form id="trip-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
          <TripCard 
            title="Departure" 
            type="departure" 
            data={departure} 
            onChange={updates => setDeparture(prev => ({ ...prev, ...updates }))}
          />

          <TripCard 
            title="Arrival" 
            type="arrival" 
            data={arrival} 
            onChange={updates => setArrival(prev => ({ ...prev, ...updates }))}
          />
        </div>

        <SubmitButton label="Calculate Duration" />
      </form>

      <DurationResult result={result} error={error} />
    </>
  );
}
