interface StepItemProps {
	number: number;
	title: string;
	description: string;
}

export function StepItem({ number, title, description }: StepItemProps) {
	return (
		<div className="flex gap-md">
			<div className="shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-extrabold text-[1.25rem] shadow-[0_4px_8px_rgba(0,0,0,0.1)]">{number}</div>
			<div className="step-content">
				<h3 className="text-[1.1rem] mb-2 text-text font-semibold">{title}</h3>
				<p className="text-[0.95rem] text-text-muted leading-relaxed">{description}</p>
			</div>
		</div>
	);
}

export default function HowToUse() {
	const steps = [
		{
			id: "departure",
			title: "Enter departure details",
			description: "Select the date and time you'll be leaving, and search for your departure city or timezone.",
		},
		{
			id: "arrival",
			title: "Enter arrival details",
			description: "Do the same for your arrival city or timezone.",
		},
		{
			id: "calculate",
			title: "Calculate",
			description: "Hit the button to see exactly how many hours and minutes you'll be in transit. DST is handled automatically.",
		},
	];

	return (
		<section className="mt-xxl p-xl bg-primary-white rounded-xl border border-border-color-soft shadow-xl shadow-primary-blue">
			<details>
				<summary>
					<span className="cursor-pointer">How to use this calculator</span>
				</summary>
				{/* <h2 className="block text-center mb-xl border-none text-[1.8rem] font-extrabold">How to Use This Calculator</h2> */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-xl mt-lg">
					{steps.map((step, index) => (
						<StepItem key={step.id} number={index + 1} title={step.title} description={step.description} />
					))}
				</div>
			</details>
		</section>
	);
}
