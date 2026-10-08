import { motion } from "motion/react";
import Button from "./Button";
const Download = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-secondary p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-20 w-full text-center max-w-4xl mx-auto bg-background mt-14 rounded-2xl border-2 border-text/50 shadow-[4px_4px_0px_0px_var(--color-text)] hover:shadow-[8px_8px_0px_0px_var(--color-text)] transition-all"
      >
        <h2 className="text-3xl font-bold text-primary font-Heading ">
          Register and Start Saving Today!
        </h2>
        <p className=" mt-3">
          Take control of your finances and start saving today.
          <br/>
          Enjoy reduced stress, increased savings, and financial freedom.
        </p>
        <Button title="Let's Go" className="font-Heading mt-3" link="/auth" />
      </motion.div>
    </div>
  );
};
export default Download;
