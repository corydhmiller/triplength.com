"use client";

import { DateTime } from "luxon";
import FormField from "./FormField";
import NowButton from "./NowButton";
import TimezoneSelect from "./TimezoneSelect";

interface TripData {
	date: string;
	time: string;
	timezone: string;
}

interface TripCardProps {
	title: string;
	type: "departure" | "arrival";
	data: TripData;
	onChange: (updates: Partial<TripData>) => void;
}

export default function TripCard({ title, type, data, onChange }: TripCardProps) {
	const prefix = type === "departure" ? "dep" : "arr";

	const handleSetNow = () => {
		const now = DateTime.now();
		onChange({
			date: now.toISODate() || "",
			time: now.toFormat("HH:mm"),
			timezone: now.zoneName,
		});
	};

	return (
		<section className="p-md bg-primary-white border border-border-color rounded-lg shadow-sm" aria-labelledby={`${prefix}-heading`}>
			<h2 id={`${prefix}-heading`} className="text-[1.2rem] mt-0 mb-md text-text border-b-2 border-accent inline-block font-semibold">
				{title}
			</h2>

			<FormField label="Date" id={`${prefix}-date`} rightElement={<NowButton onClick={handleSetNow} />}>
				<input type="date" id={`${prefix}-date`} value={data.date} onChange={e => onChange({ date: e.target.value })} required aria-label={`${title} date`} aria-required="true" className="p-3 border border-border-color rounded-md text-[1rem] text-text bg-white transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-soft)]" />
			</FormField>

			<FormField label="Time (24-hour)" id={`${prefix}-time`}>
				<input type="time" id={`${prefix}-time`} value={data.time} onChange={e => onChange({ time: e.target.value })} required aria-label={`${title} time`} aria-required="true" className="p-3 border border-border-color rounded-md text-[1rem] text-text bg-white transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-soft)]" />
			</FormField>

			<TimezoneSelect label="Timezone" id={`${prefix}-zone`} value={data.timezone} placeholder={`${title} city, region...`} onChange={val => onChange({ timezone: val })} />
		</section>
	);
}
