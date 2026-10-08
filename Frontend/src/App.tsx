
import BudgetingTool from "./components/BudgetingTool";
import Chart from "./components/Chart";
import Download from "./components/Download";
import ExpenseTrack from "./components/ExpenseTrack";
import Home from "./components/Home";
import IncomeManagement from "./components/IncomeManagment";
import SavingGoal from "./components/SavingGoal";
import ThemeToggle from "./components/Theme";
import UserFriendly from "./components/UserFriendly";

export default function App() {
  return (
    <>
        <ThemeToggle className="absolute top-10 flex w-full  items-center justify-center z-30 " />

        <Home />
        <Chart />
        <ExpenseTrack />
        <IncomeManagement />
        <BudgetingTool />
        <SavingGoal />
        <UserFriendly />
        <Download />
    </>
  );
}
