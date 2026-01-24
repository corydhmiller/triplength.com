'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function FormField({ label, id, children, rightElement }: FormFieldProps) {
  return (
    <div className="flex flex-col mb-[1.2rem]">
      <div className="flex items-center mb-[0.4rem]">
        <label 
          htmlFor={id} 
          className="text-[0.85rem] font-semibold text-text uppercase tracking-[0.05em]"
        >
          {label}
        </label>
        {rightElement}
      </div>
      {children}
    </div>
  );
}
