import { cn } from "./utils/utils";

interface Headingprops {
  Data: string;
  className?: string;
}

export default function Heading({ Data, className }: Headingprops) {
  return (
    <h1
      className={cn(
        "text-4xl md:text-6xl font-bold mb-4 font-Heading",
        className
      )}
    >
      {Data}
    </h1>
  );
}
