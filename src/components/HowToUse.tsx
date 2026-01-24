'use client';

import React from 'react';

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div className="flex gap-md">
      <div className="step-number-circle">{number}</div>
      <div className="step-content">
        <h3 className="text-[1.1rem] mb-2 text-text font-semibold">{title}</h3>
        <p className="text-[0.95rem] text-text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowToUse() {
  const steps = [
    {
      title: "Enter departure details",
      description: "Select the date and time you'll be leaving, and search for your departure city or timezone."
    },
    {
      title: "Enter arrival details",
      description: "Do the same for your arrival city or timezone."
    },
    {
      title: "Calculate",
      description: "Hit the button to see exactly how many hours and minutes you'll be in transit. DST is handled automatically."
    }
  ];

  return (
    <section className="how-to-use-section">
      <h2 className="block text-center mb-xl border-none text-[1.8rem] font-extrabold">How to Use This Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {steps.map((step, index) => (
          <StepItem 
            key={index} 
            number={index + 1} 
            title={step.title} 
            description={step.description} 
          />
        ))}
      </div>
    </section>
  );
}
