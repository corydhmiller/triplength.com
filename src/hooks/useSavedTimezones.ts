"use client";

import { useEffect, useState } from "react";

export interface SavedTimezone {
	id: string;
	city: string;
	abbr: string;
}

const STORAGE_KEY = "saved-timezones";
const MAX_SAVED = 5;

// Minimal shared state outside the hook
let memoryTimezones: SavedTimezone[] | null = null;
const listeners = new Set<(tzs: SavedTimezone[]) => void>();

const getStored = (): SavedTimezone[] => {
	if (typeof window === "undefined") return [];
	if (memoryTimezones !== null) return memoryTimezones;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		memoryTimezones = stored ? JSON.parse(stored) : [];
	} catch {
		memoryTimezones = [];
	}
	return memoryTimezones || [];
};

export function useSavedTimezones() {
	const [savedTimezones, setSavedTimezones] = useState<SavedTimezone[]>([]);

	useEffect(() => {
		// Set initial state
		const initial = getStored();
		setSavedTimezones(initial);

		// Subscribe to updates from other instances
		const onChange = (updated: SavedTimezone[]) => setSavedTimezones(updated);
		listeners.add(onChange);

		return () => {
			listeners.delete(onChange);
		};
	}, []);

	const saveTimezone = (timezone: SavedTimezone) => {
		const current = getStored();
		const updated = [timezone, ...current.filter(tz => tz.id !== timezone.id)].slice(0, MAX_SAVED);

		// Update all instances
		memoryTimezones = updated;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		listeners.forEach(listener => listener(updated));
	};

	const clearAllTimezones = () => {
		memoryTimezones = [];
		localStorage.removeItem(STORAGE_KEY);
		listeners.forEach(listener => listener([]));
	};

	return {
		savedTimezones,
		saveTimezone,
		clearAllTimezones,
	};
}
