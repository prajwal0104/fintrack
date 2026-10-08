import { useEffect, useState } from "react";
import Goto from "../utils/GOTO";

export default function Dashboarderror() {
  const [Secs, setSecs] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecs((prevSecs) => {
        if (prevSecs === 1) {
          clearInterval(interval);
          Goto({ Link: "/auth" });
          return 10;
        }
        return prevSecs - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center gap-10">
      <p className="font-Heading text-3xl md:text-6xl">
        You need to Login to access Dashboard
      </p>
      <p className="font-Heading text-primary">
        You will be redirected to Authentication page in : {Secs} second.
      </p>
    </div>
  );
}
