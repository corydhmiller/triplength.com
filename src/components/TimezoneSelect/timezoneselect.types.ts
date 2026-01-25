export interface TimezoneItem {
	id: string;
	region: string;
	city: string;
	abbr: string;
	searchString: string;
}

export interface CityMappingItem {
	city: string;
	timezone: string;
	province?: string;
	country: string;
}

export interface TimezoneSelectProps {
	label: string;
	id: string;
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
}