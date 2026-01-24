"use client";

import React, { Component, ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="p-xl bg-white border border-border-color rounded-lg shadow-md max-w-[600px] mx-auto mt-xl" role="alert" aria-live="assertive">
					<h2 className="text-[1.5rem] font-bold text-primary-black mb-md">Something went wrong</h2>
					<p className="text-text-muted mb-md">
						We encountered an unexpected error. Please try refreshing the page.
					</p>
					<details className="mb-md">
						<summary className="cursor-pointer text-primary-blue hover:underline">Error details</summary>
						<pre className="mt-sm p-sm bg-light-blue rounded text-[0.85rem] overflow-auto">
							{this.state.error?.message || "Unknown error"}
						</pre>
					</details>
					<button
						onClick={() => window.location.reload()}
						className="px-lg py-sm bg-primary-blue text-white rounded-md hover:bg-primary-black transition-all font-semibold"
					>
						Refresh Page
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
