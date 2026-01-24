'use client';

import React from 'react';

interface SubmitButtonProps {
  label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
  return (
    <button type="submit" className="btn-primary">
      {label}
    </button>
  );
}
