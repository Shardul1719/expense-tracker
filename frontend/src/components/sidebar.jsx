import { LayoutDashboard, Wallet } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="
      w-64 hidden md:flex flex-col
      bg-white/70 dark:bg-darkcard/70
      backdrop-blur-xl
      border-r border-white/10
      p-6
    ">
      <h1 className="
        text-2xl font-bold mb-10
        bg-gradient-to-r from-primary to-accent
        bg-clip-text text-transparent
      ">
        Expense Tracker
      </h1>

      <nav className="space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary">
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl opacity-60 hover:opacity-100 hover:bg-white/10 cursor-pointer transition">
          <Wallet size={18} />
          Expenses
        </div>
      </nav>
    </aside>
  );
}
