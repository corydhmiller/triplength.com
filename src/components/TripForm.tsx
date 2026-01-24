"use client";

import { DateTime } from "luxon";
import React, { useCallback, useEffect, useState } from "react";
import { calculateTripDuration } from "../utils/duration";
import DurationResult from "./DurationResult";
import SubmitButton from "./SubmitButton";
import TripCard from "./TripCard";

export default function TripForm() {
	const [departure, setDeparture] = useState(() => ({
		date: "",
		time: "",
		timezone: "",
	}));

	const [arrival, setArrival] = useState(() => ({
		date: "",
		time: "",
		timezone: "",
	}));

	const [result, setResult] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		if (!isInitialized) {
			const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const now = DateTime.now();

			setDeparture({
				date: now.toISODate() || "",
				time: now.toFormat("HH:mm"),
				timezone: zone,
			});

			setArrival({
				date: now.toISODate() || "",
				time: now.plus({ hours: 2 }).toFormat("HH:mm"),
				timezone: zone,
			});

			setIsInitialized(true);
		}
	}, [isInitialized]);

	const handleDepartureChange = useCallback((updates: Partial<typeof departure>) => {
		setDeparture(prev => ({ ...prev, ...updates }));
	}, []);

	const handleArrivalChange = useCallback((updates: Partial<typeof arrival>) => {
		setArrival(prev => ({ ...prev, ...updates }));
	}, []);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setError(null);
			setResult(null);

			if (!departure.date || !departure.time || !departure.timezone) {
				setError("Please complete all departure fields (date, time, and timezone).");
				return;
			}

			if (!arrival.date || !arrival.time || !arrival.timezone) {
				setError("Please complete all arrival fields (date, time, and timezone).");
				return;
			}

			try {
				const durationResult = calculateTripDuration(departure, arrival);
				setResult(durationResult.formatted);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "Invalid date or time selected.";
				setError(`Calculation error: ${errorMessage}`);
			}
		},
		[departure, arrival]
	);

	return (
		<>
			<form id="trip-form" onSubmit={handleSubmit} aria-describedby="trip-form-description">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
					<TripCard title="Departure" type="departure" data={departure} onChange={handleDepartureChange} />

					<TripCard title="Arrival" type="arrival" data={arrival} onChange={handleArrivalChange} />
				</div>

				<DurationResult result={result} error={error} />
				<SubmitButton label="Calculate Duration" />
			</form>
		</>
	);
}
