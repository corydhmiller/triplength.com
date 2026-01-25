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
const SYNC_EVENT = "saved-timezones-updated";

// Helper to read from localStorage
function getStoredTimezones(): SavedTimezone[] {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored) as SavedTimezone[];
		}
	} catch (error) {
		console.error("Failed to load saved timezones:", error);
	}
	return [];
}

// Helper to write to localStorage and notify other instances
function updateStoredTimezones(timezones: SavedTimezone[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones));
	// Dispatch custom event asynchronously to avoid setState during render
	setTimeout(() => {
		window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: timezones }));
	}, 0);
}

export function useSavedTimezones() {
	// Start with empty array to match SSR, load from localStorage after hydration
	const [savedTimezones, setSavedTimezones] = useState<SavedTimezone[]>([]);

	// Load from localStorage after mount (client-side only)
	useEffect(() => {
		setSavedTimezones(getStoredTimezones());
	}, []);

	// Sync state when other instances update
	useEffect(() => {
		const handleSync = (event: Event) => {
			const customEvent = event as CustomEvent<SavedTimezone[]>;
			setSavedTimezones(customEvent.detail);
		};

		window.addEventListener(SYNC_EVENT, handleSync);
		return () => window.removeEventListener(SYNC_EVENT, handleSync);
	}, []);

	// Save a new timezone
	const saveTimezone = (timezone: Omit<SavedTimezone, "timestamp">) => {
		setSavedTimezones(prev => {
			// Check if already exists
			const exists = prev.find(tz => tz.id === timezone.id);
			let updated: SavedTimezone[];

			if (exists) {
				// Move to front and update timestamp
				const filtered = prev.filter(tz => tz.id !== timezone.id);
				updated = [{ ...timezone, timestamp: Date.now() }, ...filtered];
			} else {
				// Add new timezone at the front
				updated = [{ ...timezone, timestamp: Date.now() }, ...prev].slice(0, MAX_SAVED);
			}

			updateStoredTimezones(updated);
			return updated;
		});
	};

	// Remove a timezone
	const removeTimezone = (id: string) => {
		setSavedTimezones(prev => {
			const updated = prev.filter(tz => tz.id !== id);
			updateStoredTimezones(updated);
			return updated;
		});
	};

	// Clear all saved timezones
	const clearAllTimezones = () => {
		setSavedTimezones([]);
		localStorage.removeItem(STORAGE_KEY);
		setTimeout(() => {
			window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: [] }));
		}, 0);
	};

	return {
		savedTimezones,
		saveTimezone,
		removeTimezone,
		clearAllTimezones,
	};
}
