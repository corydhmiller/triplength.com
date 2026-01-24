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
    <div className="field">
      <div className="label-row">
        <label htmlFor={id}>{label}</label>
        {rightElement}
      </div>
      {children}
    </div>
  );
}
