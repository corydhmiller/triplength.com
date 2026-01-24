'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DateTime } from 'luxon';
import cityTimezones from 'city-timezones';

interface TimezoneItem {
  id: string;
  region: string;
  city: string;
  abbr: string;
  searchString: string;
}

interface CityMappingItem {
  city: string;
  timezone: string;
  province?: string;
  country: string;
}

interface Props {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function TimezoneSelect({ label, id, placeholder, value, onChange }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(value || '');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const timezoneData = useMemo(() => {
    const ianaZones = Intl.supportedValuesOf('timeZone');
    
    const baseTimezoneData: TimezoneItem[] = ianaZones.map(zone => {
      const parts = zone.split('/');
      const region = parts[0];
      const city = parts[parts.length - 1].replace(/_/g, ' ');
      const now = DateTime.now().setZone(zone);
      return {
        id: zone,
        region,
        city,
        abbr: now.offsetNameShort || '',
        searchString: `${zone} ${region} ${city} ${now.offsetNameShort}`.toLowerCase()
      };
    });

    const cityData: TimezoneItem[] = (cityTimezones.cityMapping as CityMappingItem[]).map(city => {
      const now = DateTime.now().setZone(city.timezone);
      return {
        id: city.timezone,
        region: city.province || city.country,
        city: city.city,
        abbr: now.offsetNameShort || '',
        searchString: `${city.city} ${city.province} ${city.country} ${city.timezone} ${now.offsetNameShort}`.toLowerCase()
      };
    });

    const combinedData = [...baseTimezoneData, ...cityData];
    const seen = new Set();
    return combinedData.filter(item => {
      const key = `${item.city}-${item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!searchValue || selectedValue && searchValue === timezoneData.find(z => z.id === selectedValue)?.city + ` (${timezoneData.find(z => z.id === selectedValue)?.abbr})`) {
        // If searchValue matches the selected label, don't filter (or show all if opened)
        // But for better UX, let's just filter by what's typed
    }

    const filterLower = searchValue.toLowerCase();
    return timezoneData
      .filter(z => z.searchString.includes(filterLower))
      .sort((a, b) => {
        const aCity = a.city.toLowerCase();
        const bCity = b.city.toLowerCase();
        if (aCity === filterLower && bCity !== filterLower) return -1;
        if (bCity === filterLower && aCity !== filterLower) return 1;
        return 0;
      })
      .slice(0, 50);
  }, [searchValue, timezoneData, selectedValue]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
      const zone = timezoneData.find(z => z.id === value);
      if (zone) {
        setSearchValue(`${zone.city} (${zone.abbr})`);
      }
    } else {
      setSelectedValue('');
      setSearchValue('');
    }
  }, [value, timezoneData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (z: TimezoneItem) => {
    setSelectedValue(z.id);
    setSearchValue(`${z.city} (${z.abbr})`);
    setIsOpen(false);
    onChange?.(z.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, filteredData.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(filteredData[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col mb-[1.2rem] relative" ref={containerRef}>
      <label className="text-[0.85rem] mb-[0.4rem] font-semibold text-text uppercase tracking-[0.05em]">{label}</label>
      <div className="relative">
        <input
          type="text"
          className="p-3 border border-border-color rounded-md text-[1rem] text-text bg-white transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-soft)] w-full"
          placeholder={placeholder || "Search city, region or code..."}
          autoComplete="off"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        <input type="hidden" id={id} name={id} value={selectedValue} required />
        
        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-border-color rounded-lg max-h-[300px] overflow-y-auto overflow-x-hidden z-10 shadow-lg" ref={dropdownRef} role="listbox">
            {filteredData.map((z, index) => (
              <div
                key={`${z.id}-${z.city}-${index}`}
                className={`group p-sm cursor-pointer border-b border-border-color-soft last:border-b-0 transition-all flex flex-col text-left bg-white outline-none hover:bg-light-blue hover:text-primary-black focus:bg-light-blue focus:text-primary-black ${index === activeIndex ? 'bg-light-blue text-primary-black outline-2 outline-primary -outline-offset-2' : ''}`}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => handleSelect(z)}
              >
                <div className="font-semibold text-[0.95rem]">
                  {z.city} <small className="font-normal text-text-muted ml-xs group-hover:text-primary-black/70 group-focus:text-primary-black/70">{z.region}</small>
                </div>
                <div className="text-[0.75rem] text-text-muted mt-[0.2rem] group-hover:text-primary-black/70 group-focus:text-primary-black/70">
                  {z.abbr} — {z.id}
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <div className="p-sm text-text-muted text-center italic">No timezones found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
