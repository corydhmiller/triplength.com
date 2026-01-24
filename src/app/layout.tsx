import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
	subsets: ["latin"],
	variable: "--font-rubik",
	display: "swap",
});

export const metadata: Metadata = {
	title: "TripLength - How long will my trip be?",
	description: "Easily calculate travel duration between locations with automatic timezone handling.",
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const year = new Date().getFullYear();

	return (
		<html lang="en">
			<body className={rubik.variable}>
				{children}
				<footer className="w-full text-center p-xl px-6 text-primary-black text-[0.9rem] font-medium mt-auto">
					<p>TripLength @ {year}</p>
				</footer>
			</body>
		</html>
	);
}
