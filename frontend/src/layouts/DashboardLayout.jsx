import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-darkbg text-zinc-900 dark:text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 space-y-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
