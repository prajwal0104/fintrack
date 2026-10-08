export default function BudgetingTool() {
  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-background p-6">
      <div className="grid md:grid-cols-2 items-center max-w-5xl bg-secondary mx-auto mt-14 rounded-2xl border-2 border-text/50 shadow-[4px_4px_0px_0px_var(--color-text)] hover:shadow-[8px_8px_0px_0px_var(--color-text)] transition-all">
        <div className="p-10">
          <h2 className="text-4xl font-bold font-Heading text-primary">
            Budgeting Tools: <br />
            <span>Set and Achieve Goals</span>
          </h2>
          <p className="mt-4 ">
            Set financial goals and create budgets for different categories.
          </p>
          <p className="mt-2 ">
            Visualize progress towards goals with progress bars.
          </p>
          <div className="mt-6 space-y-4">
            {[
              "Set a Goal",
              "Create a Budget",
              "Track Progress",
              "Achieve!",
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-primary text-secondary font-bold text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-md">
                  {index + 1}
                </div>
                <p className="ml-4 text-lg text-text">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden h-full w-full">
          <div
            style={{
              backgroundPosition: "center",
            }}
            className="bg-no-repeat bg-cover text-accent bg-[url('./assets/images/Budgeting_Tools.jpg')] h-full w-full rounded-r-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-transparent md:bg-gradient-to-r " />
          </div>
        </div>
      </div>
    </div>
  );
}
