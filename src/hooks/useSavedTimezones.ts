"use client";

import { useEffect, useState } from "react";

export interface SavedTimezone {
	id: string; // IANA timezone identifier (e.g., "America/New_York")
	city: string; // Display name (e.g., "New York")
	abbr: string; // Abbreviation (e.g., "EST")
	timestamp: number; // When it was saved
}

const STORAGE_KEY = "saved-timezones";
const MAX_SAVED = 5; // Maximum number of saved timezones

export function useSavedTimezones() {
	const [savedTimezones, setSavedTimezones] = useState<SavedTimezone[]>([]);

	// Load from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as SavedTimezone[];
				setSavedTimezones(parsed);
			}
		} catch (error) {
			console.error("Failed to load saved timezones:", error);
		}
	}, []);

	// Save a new timezone
	const saveTimezone = (timezone: Omit<SavedTimezone, "timestamp">) => {
		setSavedTimezones(prev => {
			// Check if already exists
			const exists = prev.find(tz => tz.id === timezone.id);
			if (exists) {
				// Move to front and update timestamp
				const filtered = prev.filter(tz => tz.id !== timezone.id);
				const updated = [{ ...timezone, timestamp: Date.now() }, ...filtered];
				localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
				return updated;
			}

			// Add new timezone at the front
			const updated = [{ ...timezone, timestamp: Date.now() }, ...prev].slice(0, MAX_SAVED);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			return updated;
		});
	};

	// Remove a timezone
	const removeTimezone = (id: string) => {
		setSavedTimezones(prev => {
			const updated = prev.filter(tz => tz.id !== id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			return updated;
		});
	};

	// Clear all saved timezones
	const clearAllTimezones = () => {
		setSavedTimezones([]);
		localStorage.removeItem(STORAGE_KEY);
	};

	return {
		savedTimezones,
		saveTimezone,
		removeTimezone,
		clearAllTimezones,
	};
}
