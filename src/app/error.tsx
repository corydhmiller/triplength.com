"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="max-w-[1240px] w-full mt-xl mb-xxl px-6 z-10">
			<div className="p-xl bg-white border border-white-soft rounded-lg shadow-md shadow-primary-blue max-w-[600px] mx-auto mt-xl" role="alert" aria-live="assertive">
				<h2 className="text-[1.5rem] font-bold text-primary-black mb-md">Something went wrong</h2>
				<p className="text-muted mb-md">We encountered an unexpected error. Please try again.</p>
				<details className="mb-md">
					<summary className="cursor-pointer text-primary-blue hover:underline">Error details</summary>
					<pre className="mt-sm p-sm bg-light-blue rounded text-[0.85rem] overflow-auto">{error.message || "Unknown error"}</pre>
				</details>
				<button onClick={() => reset()} className="px-lg py-sm bg-primary-blue text-white rounded-md hover:bg-primary-black transition-all font-semibold">
					Try Again
				</button>
			</div>
		</div>
	);
}
