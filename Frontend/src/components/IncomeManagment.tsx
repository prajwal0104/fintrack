export default function IncomeManagement() {
  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto bg-background mt-14 rounded-2xl border-2 border-text/50 shadow-[4px_4px_0px_0px_var(--color-text)] hover:shadow-[8px_8px_0px_0px_var(--color-text)] transition-all p-10">
        <h2 className="text-4xl font-bold font-Heading text-primary ">
          Income Management: <br />
          <span>Track Your Earnings</span>
        </h2>
        <p className="mt-4">
          Track multiple income sources with ease.
          <br />
          Categorize income (e.g., Salary, Investments, Side Hustle)
          <br />
          Visualize income trends over time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-primary">Salary</h3>
            <p>Track your main source of income.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Investments</h3>
            <p>Monitor your investment earnings.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">Side Hustle</h3>
            <p>Record income from freelance work.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
