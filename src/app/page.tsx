import TripForm from "@components/TripForm";
import Information from "@components/Information";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Travel Time Calculator - Calculate Trip Duration Between Cities | TripLength",
	description: "Free travel time calculator with automatic timezone conversion. Calculate exact travel duration between any cities worldwide. Handles time zones, DST, and air travel time automatically. Perfect for flights and international trips.",
};

export default function Home() {
	return (
		<>
			<main className="max-w-[1240px] w-full mt-xl mb-xxl px-6 z-10">
				<div className="text-center mb-xl">
					<h1 className="text-black font-extrabold text-[clamp(2rem,5vw,4rem)]">Travel Time Calculator</h1>
					<p className="text-[1.1rem] text-muted mt-sm">Calculate exact travel duration between cities with automatic timezone and DST handling</p>
				</div>

				<TripForm />

				<Information />
			</main>

			<section className="w-full bg-white border-t border-b border-white-soft mt-lg py-xl z-10">
				<div className="max-w-[1240px] mx-auto px-6">
					<h2 className="text-[1.8rem] font-extrabold text-black mb-lg text-center">Why use this travel time calculator?</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-lg text-[0.95rem] mb-xl">
						<div>
							<h3 className="font-bold text-[1.1rem] mb-sm text-black">Automatic timezone conversion</h3>
							<p className="text-muted leading-relaxed">
								Unlike basic travel calculators, this tool automatically handles time zones and daylight saving time (DST) changes.
								Perfect for international air travel time calculations and business travel planning.
							</p>
						</div>
						<div>
							<h3 className="font-bold text-[1.1rem] mb-sm text-black">Accurate trip duration</h3>
							<p className="text-muted leading-relaxed">
								Get precise door-to-door travel time calculations. Whether planning flights, road trips, or multi-city itineraries,
								this travel time calculator delivers accurate results instantly.
							</p>
						</div>
						<div>
							<h3 className="font-bold text-[1.1rem] mb-sm text-black">City-based search</h3>
							<p className="text-muted leading-relaxed">
								Search by city name or timezone. No need to manually look up time zones or calculate time differences.
								The travel calculator time feature works like Google Maps travel time calculator but focuses on duration.
							</p>
						</div>
						<div>
							<h3 className="font-bold text-[1.1rem] mb-sm text-black">Free and simple</h3>
							<p className="text-muted leading-relaxed">
								No sign-up required. Just enter departure and arrival details to calculate travel time instantly.
								Perfect for time to travel calculator needs without complexity.
							</p>
						</div>
					</div>

					<div className="border-t border-white-soft pt-lg mt-lg">
						<h2 className="text-[1.5rem] font-bold text-black mb-md">Common travel time calculator uses</h2>
						<ul className="list-disc list-inside space-y-sm text-muted text-[0.95rem] leading-relaxed ml-sm">
							<li><strong>Air travel time:</strong> Calculate flight duration between international destinations with timezone adjustments</li>
							<li><strong>Trip duration estimation:</strong> Plan trips with precise time calculations from door-to-door</li>
							<li><strong>International travel:</strong> Avoid confusion with automatic DST and timezone handling</li>
						</ul>
					</div>
				</div>
				<footer className="w-full text-center p-xl px-6 text-black text-[0.9rem] font-medium mt-auto">
					<p>TripLength &copy; {new Date().getFullYear()}</p>
				</footer>
			</section>
			<div className="background-cloud"></div>
		</>
	);
}
