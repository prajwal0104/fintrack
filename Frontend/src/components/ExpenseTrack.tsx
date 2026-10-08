import { ShoppingCart, Utensils, Bus, Calendar } from "lucide-react";

export default function ExpenseTracking() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-background shadow-md w-full min-h-screen md:min-h-[70vh]">
      {/* Left Section: Text Content */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 py-10">
        <h2 className="text-3xl md:text-4xl font-Heading font-semibold">
          Expense Tracking: <br />
          <span className="text-primary">Effortless Input</span>
        </h2>
        <p className="mt-4 text-text/70">
          Add daily expenses quickly using our simple input form.
        </p>
        <p className="mt-2 text-text/70">Expenses are categorized for detailed tracking.</p>

        {/* Category Icons */}
        <div className="flex flex-wrap gap-6 mt-6">
          {[
            { icon: <Utensils className="w-8 h-8" />, label: "Food" },
            { icon: <Bus className="w-8 h-8" />, label: "Transport" },
            { icon: <Calendar className="w-8 h-8" />, label: "Bills" },
            { icon: <ShoppingCart className="w-8 h-8" />, label: "Shopping" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.icon}
              <span className="mt-2 text-text/70 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Responsive Background Image */}
      <div className="w-full md:w-1/2 h-64 md:h-[70vh] bg-cover bg-center relative">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage:
              "url('./src/assets/images/Expense.jpg')",
          }}
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent md:bg-gradient-to-r" />
      </div>
    </div>
  );
}
