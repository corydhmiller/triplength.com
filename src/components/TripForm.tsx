'use client';

import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import TimezoneSelect from './TimezoneSelect';
import { calculateTripDuration } from '../utils/duration';

export default function TripForm() {
  const [userZone, setUserZone] = useState('UTC');
  
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
    setUserZone(zone);
    
    const now = DateTime.now();
    const defaultDepDate = now.toISODate() || '';
    const defaultDepTime = now.toFormat("HH:mm");
    const defaultArrDate = now.toISODate() || '';
    const defaultArrTime = now.plus({ hours: 2 }).toFormat("HH:mm");

    setDeparture({
      date: defaultDepDate,
      time: defaultDepTime,
      timezone: zone
    });

    setArrival({
      date: defaultArrDate,
      time: defaultArrTime,
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
        <div className="grid-container">
          <section className="card">
            <h2 className="text-[1.2rem] mt-0 mb-md text-text border-b-2 border-accent inline-block font-semibold">Departure</h2>
            <div className="field">
              <label htmlFor="dep-date">Date</label>
              <input 
                type="date" 
                id="dep-date" 
                value={departure.date} 
                onChange={e => setDeparture(prev => ({ ...prev, date: e.target.value }))}
                required 
              />
            </div>
            <div className="field">
              <label htmlFor="dep-time">Time</label>
              <input 
                type="time" 
                id="dep-time" 
                value={departure.time} 
                onChange={e => setDeparture(prev => ({ ...prev, time: e.target.value }))}
                required 
              />
            </div>
            <TimezoneSelect 
              label="Timezone" 
              id="dep-zone" 
              initialValue={userZone} 
              placeholder="Departure city, region..." 
              onChange={val => setDeparture(prev => ({ ...prev, timezone: val }))}
            />
          </section>

          <section className="card">
            <h2 className="text-[1.2rem] mt-0 mb-md text-text border-b-2 border-accent inline-block font-semibold">Arrival</h2>
            <div className="field">
              <label htmlFor="arr-date">Date</label>
              <input 
                type="date" 
                id="arr-date" 
                value={arrival.date} 
                onChange={e => setArrival(prev => ({ ...prev, date: e.target.value }))}
                required 
              />
            </div>
            <div className="field">
              <label htmlFor="arr-time">Time</label>
              <input 
                type="time" 
                id="arr-time" 
                value={arrival.time} 
                onChange={e => setArrival(prev => ({ ...prev, time: e.target.value }))}
                required 
              />
            </div>
            <TimezoneSelect 
              label="Timezone" 
              id="arr-zone" 
              initialValue={userZone} 
              placeholder="Arrival city, region..." 
              onChange={val => setArrival(prev => ({ ...prev, timezone: val }))}
            />
          </section>
        </div>

        <button type="submit" className="btn-primary">Calculate Duration</button>
      </form>

      {(result || error) && (
        <div id="result" className="result-container">
          <h3 className="mt-0 text-[1.1rem] text-accent-dark uppercase tracking-widest">Total trip duration</h3>
          <p id="duration-text" className="mt-xs text-[clamp(2rem,5vw,4rem)] font-extrabold text-primary-black">{result || error}</p>
        </div>
      )}
    </>
  );
}
