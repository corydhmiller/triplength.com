interface DurationResultProps {
	result: string | null;
	error: string | null;
}

export default function DurationResult({ result, error }: DurationResultProps) {
	if (!result && !error) return null;

	const isError = Boolean(error);

	return (
		<div id="result" className="p-10 text-center" role={isError ? "alert" : "status"} aria-live="polite" aria-atomic="true">
			<h3 className="mt-0 text-[1.1rem] text-accent-dark uppercase tracking-widest">{isError ? "Error" : "Total trip duration"}</h3>
			<p id="duration-text" className={`text-[clamp(2rem,5vw,4rem)] font-extrabold ${isError ? "text-red-600" : "text-black"}`}>
				{result || error}
			</p>
		</div>
	);
}
