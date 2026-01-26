import TripForm from "@components/TripForm";
import Information from "@components/Information";

export default function Home() {
	return (
		<>
			<main className="max-w-[1240px] w-full mt-xl mb-xxl px-6 z-10">
				<div className="text-center mb-xl">
					<h1 className="text-black font-extrabold text-[clamp(2rem,5vw,4rem)]">How long will my trip be?</h1>
					<h3>A simple tool to calculate the duration of any trip.</h3>
				</div>

				<TripForm />

				<Information />
			</main>
			<div className="background-cloud"></div>
		</>
	);
}
