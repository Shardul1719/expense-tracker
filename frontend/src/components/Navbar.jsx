import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="
      sticky top-0 z-50
      backdrop-blur-xl
      bg-white/70 dark:bg-darkbg/70
      border-b border-white/10
    ">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold
          bg-gradient-to-r from-primary to-accent
          bg-clip-text text-transparent"
        >
          Expense Tracker
        </motion.h1>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl
            bg-red-500 text-white
            hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
