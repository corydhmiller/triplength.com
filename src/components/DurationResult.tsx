'use client';

import React from 'react';

interface DurationResultProps {
  result: string | null;
  error: string | null;
}

export default function DurationResult({ result, error }: DurationResultProps) {
  if (!result && !error) return null;

  return (
    <div id="result" className="result-container">
      <h3 className="mt-0 text-[1.1rem] text-accent-dark uppercase tracking-widest">Total trip duration</h3>
      <p id="duration-text" className="mt-xs text-[clamp(2rem,5vw,4rem)] font-extrabold text-primary-black">
        {result || error}
      </p>
    </div>
  );
}
