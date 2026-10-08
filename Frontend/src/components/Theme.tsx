import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { cn } from "./utils/utils";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

type ThemeType = "light" | "dark";

export default function ThemeToggle({
  className,
  hidden,
}: {
  className?: string;
  hidden?: boolean;
}) {
  // Load theme from localStorage or default to "dark"
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem("theme") as ThemeType) || "dark"
  );

  useEffect(() => {
    // Sync theme with localStorage
    localStorage.setItem("theme", theme);

    // Apply theme class to the HTML element
    const root = document.querySelector("html");
    root?.classList.remove("light", "dark");
    root?.classList.add(theme);
  }, [theme]);

  return (
    <div className={className}>
      <SliderToggle theme={theme} setTheme={setTheme} hidden={hidden} />
    </div>
  );
}

const SliderToggle = ({
  theme,
  setTheme,
  hidden = true,
}: {
  theme: ThemeType;
  hidden?: boolean;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}) => {
  return (
    <div className="border-1  border-primary/20 hover:border-primary/80 select-none relative flex w-fit items-center rounded-full bg-background text-text">
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => setTheme("light")}
      >
        <FiSun className="relative z-10 md:text-sm" />
        <span
          className={cn(
            "relative z-10 hidden md:block",
            hidden ? "hidden" : "block"
          )}
        >
          Light
        </span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => setTheme("dark")}
      >
        <FiMoon className="relative z-10 md:text-sm" />
        <span
          className={cn(
            "relative z-10 hidden md:block",
            hidden ? "hidden" : "block"
          )}
        >
          Dark
        </span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
};
