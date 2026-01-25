interface SubmitButtonProps {
	label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
	return (
		<button type="submit" className="w-full max-w-[400px] mx-auto block p-5 bg-primary-blue-dark rounded-lg text-[1.25rem] font-semibold tracking-wide hover:-translate-y-[2px] transition-all border-none text-white cursor-pointer shadow-2xl shadow-primary-blue-dark ">
			{label}
		</button>
	);
}
