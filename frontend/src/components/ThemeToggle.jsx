import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => setDark(!dark)}
      className="p-2 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur border border-white/10"
    >
      {dark ? (
        <Sun className="text-yellow-400" size={18} />
      ) : (
        <Moon className="text-zinc-900" size={18} />
      )}
    </motion.button>
  );
}
