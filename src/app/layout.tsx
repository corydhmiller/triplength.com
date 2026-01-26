import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
	subsets: ["latin"],
	variable: "--font-rubik",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Travel Time Calculator - Calculate Trip Duration Between Cities | TripLength",
	description: "Free travel time calculator with automatic timezone conversion. Calculate exact travel duration between any cities worldwide. Handles time zones, DST, and air travel time automatically. Perfect for flights and international trips.",
	keywords: [
		"travel time calculator",
		"travel calculator",
		"time to travel calculator",
		"air travel time calculator",
		"travel time calculator google maps",
		"google maps travel time calculator",
		"trip duration calculator",
		"travel calculator time",
		"time travel calculator",
		"timezone converter",
		"flight duration calculator",
		"time zone calculator",
		"travel planner",
		"business travel calculator",
		"door to door travel time",
		"international travel time",
		"time difference calculator",
		"journey duration",
		"how long is my trip",
	],
	authors: [{ name: "TripLength" }],
	creator: "TripLength",
	publisher: "TripLength",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		title: "Travel Time Calculator - Calculate Trip Duration | TripLength",
		description: "Free travel time calculator with automatic timezone conversion. Calculate exact travel duration between cities with DST and time zone handling.",
		url: "https://triplength.com",
		siteName: "TripLength",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/assets/triplength-opengraph.jpg",
				width: 1200,
				height: 630,
				alt: "TripLength - Travel Time Calculator with Timezone Conversion",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Travel Time Calculator - Calculate Trip Duration | TripLength",
		description: "Free travel time calculator with automatic timezone conversion. Calculate exact travel duration between cities with DST handling.",
		images: ["/assets/triplength-opengraph.jpg"],
		creator: "@triplength",
	},
	alternates: {
		canonical: "https://triplength.com",
	},
	category: "Travel Tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const year = new Date().getFullYear();

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			name: "TripLength Travel Time Calculator",
			applicationCategory: "UtilityApplication",
			operatingSystem: "Web Browser",
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD",
			},
			description: "Free travel time calculator with automatic timezone conversion. Calculate exact travel duration between cities with DST handling.",
			url: "https://triplength.com",
			author: {
				"@type": "Organization",
				name: "TripLength",
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "5",
				ratingCount: "1",
			},
			featureList: [
				"Automatic timezone conversion",
				"DST (Daylight Saving Time) handling",
				"City and timezone search",
				"Accurate travel duration calculation",
				"Door-to-door travel time estimation",
				"Air travel time calculation",
				"Business travel planning",
			],
		},
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "How does the travel time calculator work?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Our travel time calculator automatically handles timezone conversions and daylight saving time (DST) changes. Simply enter your departure and arrival cities with dates and times, and we'll calculate the exact duration of your trip.",
					},
				},
				{
					"@type": "Question",
					name: "Does this calculate air travel time?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Yes, our travel time calculator is perfect for calculating air travel time between cities. It automatically accounts for time zones and DST, giving you accurate door-to-door travel duration.",
					},
				},
				{
					"@type": "Question",
					name: "Is this travel calculator free to use?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Yes, TripLength is completely free to use. No sign-up required. Calculate unlimited trip durations with automatic timezone handling.",
					},
				},
			],
		},
	];

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={rubik.variable}>
				{children}
			</body>
		</html>
	);
}
