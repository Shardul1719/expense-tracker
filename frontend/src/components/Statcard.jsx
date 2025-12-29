import { motion } from "framer-motion";

export default function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
        p-6 rounded-2xl
        bg-white/80 dark:bg-darkcard/80
        backdrop-blur
        border border-white/10
        shadow-xl
      "
    >
      <p className="text-sm opacity-60">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </motion.div>
  );
}
