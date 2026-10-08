import { Layout, Navigation, Accessibility } from "lucide-react";
import { motion } from "motion/react";

const features = [
  { title: "Clean Interface", icon: Layout },
  { title: "Intuitive Navigation", icon: Navigation },
  { title: "Accessibility Features", icon: Accessibility },
];
const UserFriendly = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-secondary p-10 max-w-4xl mx-auto mt-14 rounded-2xl border-2 border-text/50 shadow-[4px_4px_0px_0px_var(--color-text)] hover:shadow-[8px_8px_0px_0px_var(--color-text)] transition-all">
        <h2 className="text-3xl font-bold text-primary text-center">
          User-Friendly Design and Accessibility
        </h2>
        <p className="text-center mt-2">
          Our app is committed to user-friendly design.
        </p>
        <p className="text-center">
          {" "}
          Enjoy a clean interface, intuitive navigation, and visually appealing
          aesthetics.
        </p>
        <div className="relative mt-10 flex flex-col items-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-primary/30"></div>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center h-30 w-full max-w-lg relative"
              >
                {index % 2 === 0 ? (
                  <div className="w-1/2 text-right pr-6 font-medium">
                    {feature.title}
                  </div>
                ) : (
                  <div className="w-1/2"></div>
                )}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-accent bg-primary transition">
                  <Icon className="w-7 h-7" />
                </div>
                {index % 2 !== 0 ? (
                  <div className="w-1/2 pl-6 font-medium">{feature.title}</div>
                ) : (
                  <div className="w-1/2"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserFriendly;
