'use client';

import React from 'react';

interface NowButtonProps {
  onClick: () => void;
}

export default function NowButton({ onClick }: NowButtonProps) {
  return (
    <button 
      type="button" 
      className="btn-now"
      onClick={onClick}
    >
      Set to Now
    </button>
  );
}
