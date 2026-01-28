import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cityTimezones from 'city-timezones';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🌍 Generating timezone data...');

// Get IANA timezone list
const ianaZones = Intl.supportedValuesOf("timeZone");

// Process IANA timezones (no DateTime operations needed)
const baseTimezoneData = ianaZones.map(zone => {
	const parts = zone.split("/");
	const region = parts[0];
	const city = parts[parts.length - 1].replace(/_/g, " ");
	return {
		id: zone,
		region,
		city,
		abbr: "",
		searchString: `${zone} ${region} ${city}`.toLowerCase(),
	};
});

console.log(`✓ Processed ${baseTimezoneData.length} IANA timezones`);

// Process city data from city-timezones
const cityData = cityTimezones.cityMapping.map(city => {
	return {
		id: city.timezone,
		region: city.province || city.country,
		city: city.city,
		abbr: "",
		searchString: `${city.city} ${city.province || ''} ${city.country} ${city.timezone}`.toLowerCase(),
	};
});

console.log(`✓ Processed ${cityData.length} cities from city-timezones`);

// Combine and deduplicate
const combinedData = [...baseTimezoneData, ...cityData];
const seen = new Set();
const deduplicated = combinedData.filter(item => {
	const key = `${item.city}-${item.id}`;
	if (seen.has(key)) return false;
	seen.add(key);
	return true;
});

console.log(`✓ Combined and deduplicated to ${deduplicated.length} unique entries`);

// Write to public directory
const outputPath = join(__dirname, '..', 'public', 'data', 'timezones.json');
const outputDir = dirname(outputPath);

// Create directory if it doesn't exist
import { mkdirSync } from 'fs';
mkdirSync(outputDir, { recursive: true });

writeFileSync(outputPath, JSON.stringify(deduplicated, null, 0));

const fileSize = (Buffer.byteLength(JSON.stringify(deduplicated)) / 1024).toFixed(2);
console.log(`✓ Wrote ${fileSize}KB to ${outputPath}`);
console.log('✅ Timezone data generation complete!');
