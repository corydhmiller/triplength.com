"use client";

import { SavedTimezone } from "@hooks/useSavedTimezones";

interface SavedTimezonesProps {
	timezones: SavedTimezone[];
	onSelect: (timezone: SavedTimezone) => void;
}

export default function SavedTimezones({ timezones, onSelect }: SavedTimezonesProps) {
	if (timezones.length === 0) {
		return null;
	}

	return (
		<div className="mt-sm">
			<p className="text-[0.75rem] text-text-muted mb-xs font-medium uppercase tracking-wide">Recent</p>
			<div className="flex flex-wrap gap-xs">
				{timezones.map(tz => (
					<button
						key={tz.id}
						type="button"
						onClick={() => onSelect(tz)}
						className="px-xs py-[0.2rem] bg-white text-primary-black text-[0.8rem] rounded border border-border-color hover:border-primary-blue hover:text-primary-blue transition-all"
						title={`Select ${tz.city} (${tz.abbr})`}
					>
						{tz.city} <span className="text-[0.7rem] opacity-70">({tz.abbr})</span>
					</button>
				))}
			</div>
		</div>
	);
}
