import TripForm from "../components/TripForm";
import HowToUse from "../components/HowToUse";

export default function Home() {
	return (
		<main className="max-w-[1240px] w-full mt-xl mb-xxl px-6">
			<h1 className="text-center text-primary-black font-extrabold mb-sm text-[clamp(2rem,5vw,4rem)]">How long will my trip be?</h1>

			<TripForm />

			<HowToUse />
			<div className="background-cloud"></div>
		</main>
	);
}
