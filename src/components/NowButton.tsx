'use client';

import React from 'react';

interface NowButtonProps {
  onClick: () => void;
}

export default function NowButton({ onClick }: NowButtonProps) {
  return (
    <button 
      type="button" 
      className="text-[0.7rem] px-[0.5rem] py-[0.2rem] bg-primary-soft text-primary-blue border border-primary-blue rounded-sm cursor-pointer font-bold uppercase transition-all ml-auto hover:bg-primary-blue hover:text-white"
      onClick={onClick}
    >
      Set to Now
    </button>
  );
}
