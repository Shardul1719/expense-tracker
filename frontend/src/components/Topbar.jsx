import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { logout } = useAuth();

  return (
    <header className="
      flex justify-between items-center
      px-8 py-4
      border-b border-white/10
      bg-white/60 dark:bg-darkbg/60
      backdrop-blur-xl
    ">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
