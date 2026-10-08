import { Dispatch, JSX, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiHome,
} from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import {
  MdAttachMoney,
  MdOutlineSavings,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { BiTrendingUp, BiTransfer } from "react-icons/bi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { motion } from "motion/react";
import { cn } from "../utils/utils";
import ThemeToggle from "../Theme";
import Investments from "./Investments";
import BudgetsPage from "./Budgets";
import ExpensesPage from "./Expenses";
import DebtsPage from "./Debt";
import IncomesPage from "./Income";
import SavingsPage from "./Savings";
import Transcations from "./Transcations";
import { GetUserDetails } from "../utils/DbSchema";

const componentMap: { [key: string]: JSX.Element } = {
  Home: <div>HI Its HOME</div>,
  Budgets: <BudgetsPage />,
  Debts: <DebtsPage />,
  Expenses: <ExpensesPage />,
  Incomes: <IncomesPage />,
  Investments: <Investments />,
  Savings: <SavingsPage />,
  "All Transactions": <Transcations />,
  Reports: (
    <div className="bg-primary text-accent flex justify-center items-center h-screen w-full text-6xl">
      {" "}
      Reports
    </div>
  ),
};

export const DashBoardApp = () => {
  const [selected, setSelected] = useState("Debts");
  return (
    <div className="flex h-screen bg-background">
      <ThemeToggle className="absolute top-5 flex w-full  items-center justify-center z-30 " />

      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="flex-1 h-screen overflow-x-hidden ">
        {componentMap[selected] || <div>ERROR</div>}
      </div>
    </div>
  );
};

const Sidebar = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.nav
      layout
      className="sticky top-0 shrink-0 border-r border-accent bg-primary p-2 overflow-auto"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />
      <div className="flex flex-col flex-wrap">
        <Option
          Icon={FiHome}
          title="Home"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={MdOutlineAccountBalanceWallet}
          title="Budgets"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <Option
          Icon={BiTrendingUp}
          title="Debts"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FaMoneyBillWave}
          title="Expenses"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={MdAttachMoney}
          title="Incomes"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={AiOutlineFundProjectionScreen}
          title="Investments"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={MdOutlineSavings}
          title="Savings"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={BiTransfer}
          title="All Transactions"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiBarChart}
          title="Reports"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={cn(
        "relative flex h-10 text-lg w-full items-center rounded-md transition-colors",
        selected === title ? "bg-secondary " : " hover:bg-secondary/30"
      )}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-text text-sm text-secondary"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-secondary">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-sm font-semibold font-Heading">
                {GetUserDetails().user_name}
              </span>
              <span className="block text-xs text-slate-500">beta</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid text-xl font-Heading size-10 shrink-0 place-content-center rounded-md bg-accent"
    >
      {/* <img width="24" height="auto" className="fill-slate-50"></img> */}
      {GetUserDetails().user_name[0].toUpperCase() || "U"}
    </motion.div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-secondary/50"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={cn("transition-transform", open && "rotate-180")}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

// const ExampleContent = () => (
//   <div className="h-screen w-full transition">
//     if (condition) {}
//     <FinancialDashboard />
//   </div>
// );
