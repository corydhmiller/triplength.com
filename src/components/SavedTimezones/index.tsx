"use client";

import { SavedTimezone } from "@hooks/useSavedTimezones";

interface SavedTimezonesProps {
	timezones: SavedTimezone[];
	onSelect: (timezone: SavedTimezone) => void;
	onClearAll: () => void;
}

export default function SavedTimezones({ timezones, onSelect, onClearAll }: SavedTimezonesProps) {
	if (timezones.length === 0) {
		return null;
	}

	return (
		<div className="mt-sm">
			<div className="flex items-center justify-between mb-xs">
				<p className="text-[0.75rem] text-muted font-medium uppercase tracking-wide">Recent</p>
				<button
					type="button"
					onClick={onClearAll}
					className="text-[0.7rem] text-muted hover:text-primary-blue transition-colors"
					title="Clear all recent timezones"
				>
					Clear all
				</button>
			</div>
			<div className="flex flex-wrap gap-xs">
				{timezones.map(tz => (
					<button
						key={tz.id}
						type="button"
						onClick={() => onSelect(tz)}
						className="px-xs py-[0.2rem] bg-white text-black text-[0.8rem] rounded border border-white-soft hover:border-primary-blue hover:text-primary-blue transition-all"
						title={`Select ${tz.city} (${tz.abbr})`}
					>
						{tz.city} <span className="text-[0.7rem] opacity-70">({tz.abbr})</span>
					</button>
				))}
			</div>
		</div>
	);
}
