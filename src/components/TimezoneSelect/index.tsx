"use client";

import cityTimezones from "city-timezones";
import { DateTime } from "luxon";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSavedTimezones } from "@hooks/useSavedTimezones";
import SavedTimezones from "@components/SavedTimezones";

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

let cachedTimezoneData: TimezoneItem[] | null = null;

function getTimezoneData(): TimezoneItem[] {
	if (cachedTimezoneData) {
		return cachedTimezoneData;
	}

	const ianaZones = Intl.supportedValuesOf("timeZone");

	const baseTimezoneData: TimezoneItem[] = ianaZones.map(zone => {
		const parts = zone.split("/");
		const region = parts[0];
		const city = parts[parts.length - 1].replace(/_/g, " ");
		const now = DateTime.now().setZone(zone);
		return {
			id: zone,
			region,
			city,
			abbr: now.offsetNameShort || "",
			searchString: `${zone} ${region} ${city} ${now.offsetNameShort}`.toLowerCase(),
		};
	});

	const cityData: TimezoneItem[] = (cityTimezones.cityMapping as CityMappingItem[]).map(city => {
		const now = DateTime.now().setZone(city.timezone);
		return {
			id: city.timezone,
			region: city.province || city.country,
			city: city.city,
			abbr: now.offsetNameShort || "",
			searchString: `${city.city} ${city.province} ${city.country} ${city.timezone} ${now.offsetNameShort}`.toLowerCase(),
		};
	});

	const combinedData = [...baseTimezoneData, ...cityData];
	const seen = new Set();
	const deduplicated = combinedData.filter(item => {
		const key = `${item.city}-${item.id}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});

	cachedTimezoneData = deduplicated;
	return deduplicated;
}

export default function TimezoneSelect({ label, id, placeholder, value, onChange }: Props) {
	const [searchValue, setSearchValue] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [selectedValue, setSelectedValue] = useState(value || "");

	const containerRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const timezoneData = getTimezoneData();
	const { savedTimezones, saveTimezone } = useSavedTimezones();

	const filteredData = useMemo(() => {
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
	}, [searchValue, selectedValue]);

	useEffect(() => {
		if (value) {
			setSelectedValue(value);
			const zone = timezoneData.find(z => z.id === value);
			if (zone) {
				setSearchValue(`${zone.city} (${zone.abbr})`);
			}
		} else {
			setSelectedValue("");
			setSearchValue("");
		}
	}, [value]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (z: TimezoneItem) => {
		setSelectedValue(z.id);
		setSearchValue(`${z.city} (${z.abbr})`);
		setIsOpen(false);
		onChange?.(z.id);

		// Save to recent timezones
		saveTimezone({
			id: z.id,
			city: z.city,
			abbr: z.abbr,
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				setIsOpen(true);
				setActiveIndex(0);
			}
			return;
		}

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setActiveIndex(prev => Math.min(prev + 1, filteredData.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				setActiveIndex(prev => Math.max(prev - 1, 0));
				break;
			case "Home":
				e.preventDefault();
				setActiveIndex(0);
				break;
			case "End":
				e.preventDefault();
				setActiveIndex(filteredData.length - 1);
				break;
			case "Enter":
				if (activeIndex >= 0 && filteredData[activeIndex]) {
					e.preventDefault();
					handleSelect(filteredData[activeIndex]);
				}
				break;
			case "Escape":
				e.preventDefault();
				setIsOpen(false);
				setActiveIndex(-1);
				inputRef.current?.focus();
				break;
			case "Tab":
				setIsOpen(false);
				setActiveIndex(-1);
				break;
		}
	};

	useEffect(() => {
		if (activeIndex >= 0 && dropdownRef.current) {
			const activeItem = dropdownRef.current.children[activeIndex] as HTMLElement;
			if (activeItem) {
				activeItem.scrollIntoView({ block: "nearest" });
			}
		}
	}, [activeIndex]);

	const handleSavedTimezoneSelect = (tz: { id: string; city: string; abbr: string }) => {
		const zone = timezoneData.find(z => z.id === tz.id);
		if (zone) {
			handleSelect(zone);
		}
	};

	return (
		<div className="flex flex-col mb-[1.2rem] relative" ref={containerRef}>
			<label htmlFor={`${id}-input`} className="text-[0.85rem] mb-[0.4rem] font-semibold text-text uppercase tracking-[0.05em]">
				{label}
			</label>
			<div className="relative">
				<input
					ref={inputRef}
					id={`${id}-input`}
					type="text"
					className="p-3 border border-white-soft rounded-md text-[1rem] text-text bg-white transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-soft)] w-full"
					placeholder={placeholder || "Search city, region or code..."}
					autoComplete="off"
					value={searchValue}
					onChange={e => {
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
					aria-controls={`${id}-listbox`}
					aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
					aria-label={label}
				/>
				<input type="hidden" id={id} name={id} value={selectedValue} required />

				{isOpen && (
					<div id={`${id}-listbox`} className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-white-soft rounded-lg max-h-[300px] overflow-y-auto overflow-x-hidden z-10 shadow-lg" ref={dropdownRef} role="listbox" aria-label={`${label} options`}>
						{filteredData.map((z, index) => {
							const isActive = index === activeIndex;
							return (
								<div id={`${id}-option-${index}`} key={`${z.id}-${z.city}-${index}`} className={`group p-sm cursor-pointer border-b border-border-white-soft last:border-b-0 transition-all flex flex-col text-left outline-none ${isActive ? "bg-light-blue text-primary-black" : "bg-white hover:bg-light-blue hover:text-primary-black"}`} role="option" aria-selected={selectedValue === z.id} onClick={() => handleSelect(z)}>
									<div className="font-semibold text-[0.95rem]">
										{z.city} <small className={`font-normal ml-xs ${isActive ? "text-primary-black/70" : "text-muted group-hover:text-primary-black/70"}`}>{z.region}</small>
									</div>
									<div className={`text-[0.75rem] mt-[0.2rem] ${isActive ? "text-primary-black/70" : "text-muted group-hover:text-primary-black/70"}`}>
										{z.abbr} — {z.id}
									</div>
								</div>
							);
						})}
						{filteredData.length === 0 && (
							<div className="p-sm text-muted text-center italic" role="status">
								No timezones found
							</div>
						)}
					</div>
				)}
			</div>

			<SavedTimezones timezones={savedTimezones} onSelect={handleSavedTimezoneSelect} />
		</div>
	);
}
