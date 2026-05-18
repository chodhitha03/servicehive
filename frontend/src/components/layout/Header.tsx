import { useAuth } from "../../store/auth";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Search, Menu } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          <span>Workspace</span>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-900 dark:text-white">Overview</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
        <div className="hidden sm:flex relative max-w-md w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:leading-6 bg-gray-50 dark:bg-white/5 dark:text-white"
            placeholder="Search leads, reports..."
          />
        </div>

        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-white/10 pl-4 md:pl-6">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-xs font-semibold text-blue-700 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-500/30">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <button 
              onClick={() => void logout()}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};