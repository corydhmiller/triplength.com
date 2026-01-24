interface SubmitButtonProps {
	label: string;
}

export default function SubmitButton({ label }: SubmitButtonProps) {
	return (
		<button type="submit" className="w-full max-w-[400px] mx-auto block p-5 bg-primary-blue text-white rounded-lg text-[1.25rem] font-bold hover:bg-primary-black hover:-translate-y-[2px] transition-all border-none cursor-pointer">
			{label}
		</button>
	);
}
