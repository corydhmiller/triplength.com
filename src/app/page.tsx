import TripForm from '../components/TripForm';

export default function Home() {
  return (
    <main className="max-w-[1240px] w-full mt-xl mb-xxl px-6 rounded-lg">
      <h1>How long will my trip be?</h1>

      <TripForm />

      <section className="how-to-use-section">
        <h2 className="block text-center mb-xl border-none text-[1.8rem] font-extrabold">How to Use This Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <div className="flex gap-md">
            <div className="step-number-circle">1</div>
            <div className="step-content">
              <h3 className="text-[1.1rem] mb-2 text-text font-semibold">Enter departure details</h3>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                Select the date and time you&apos;ll be leaving, and search for your departure city or timezone.
              </p>
            </div>
          </div>
          <div className="flex gap-md">
            <div className="step-number-circle">2</div>
            <div className="step-content">
              <h3 className="text-[1.1rem] mb-2 text-text font-semibold">Enter arrival details</h3>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                Do the same for your arrival city or timezone.
              </p>
            </div>
          </div>
          <div className="flex gap-md">
            <div className="step-number-circle">3</div>
            <div className="step-content">
              <h3 className="text-[1.1rem] mb-2 text-text font-semibold">Calculate</h3>
              <p className="text-[0.95rem] text-text-muted leading-relaxed">
                Hit the button to see exactly how many hours and minutes you&apos;ll be in transit. DST is handled automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
