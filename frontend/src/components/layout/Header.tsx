import { Button } from "../ui/Button";
import { useAuth } from "../../store/auth";
import { useTheme } from "../../hooks/useTheme";

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/70 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 transition-colors">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-slate-400">
          Lead Management
        </p>
        <h2 className="font-display text-2xl text-ink-900 dark:text-white">Smart Leads</h2>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 text-ink-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <div className="text-right">
          <p className="text-sm font-semibold text-ink-900 dark:text-slate-200">{user?.name}</p>
          <p className="text-xs text-brand-500 font-medium">{user?.role}</p>
        </div>
        <Button variant="ghost" onClick={() => void logout()} className="dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">
          Sign out
        </Button>
      </div>
    </header>
  );
};