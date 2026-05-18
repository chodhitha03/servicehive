import { useAuth } from "../../store/auth";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 dark:border-white/10 px-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        <span>Workspace</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 dark:text-white">Leads</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-xs font-semibold text-gray-900 dark:text-white">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <button 
            onClick={() => void logout()}
            className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};