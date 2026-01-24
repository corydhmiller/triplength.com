import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
	subsets: ["latin"],
	variable: "--font-rubik",
	display: "swap",
});

export const metadata: Metadata = {
	title: "How long will my trip be?",
	description: "Calculate travel duration between two cities in different timezones with automatic DST handling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const year = new Date().getFullYear();

	return (
		<html lang="en" className={rubik.variable}>
			<body>
				{children}
				<footer className="w-full text-center p-xl px-6 text-primary-black text-[0.9rem] font-medium mt-auto">
					<p>HLWMTB @ {year}</p>
				</footer>
			</body>
		</html>
	);
}
