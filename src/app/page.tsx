import TripForm from "../components/TripForm";
import HowToUse from "../components/HowToUse";

export default function Home() {
	return (
		<main className="max-w-[1240px] w-full mt-xl mb-xxl px-6 rounded-lg">
			<h1 className="text-center text-primary-black font-extrabold mb-lg text-[clamp(2rem,5vw,4rem)]">
				How long will my trip be?
			</h1>

			<TripForm />

			<HowToUse />
		</main>
	);
}
