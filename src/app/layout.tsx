import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
	subsets: ["latin"],
	variable: "--font-rubik",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://triplength.com'),
	title: "Calculate Travel Time with Timezones | TripLength",
	description: "Get instant travel time between cities with automatic timezone and DST handling. Perfect for planning international flights and trips.",
	keywords: [
		"travel time calculator",
		"timezone converter",
		"flight duration calculator",
		"trip duration calculator",
		"international travel time",
		"time zone calculator",
		"DST calculator",
		"business travel planner",
		"air travel calculator",
		"journey duration",
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
		title: "Calculate Travel Time Between Cities with Timezones",
		description: "Get instant travel time calculations with automatic timezone and DST handling. Perfect for planning international flights and business trips.",
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
		title: "Calculate Travel Time Between Cities with Timezones",
		description: "Get instant travel time with automatic timezone and DST handling. Perfect for international flights and business trips.",
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
			description: "Get instant travel time between cities with automatic timezone and DST handling. Perfect for planning international flights and trips.",
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
