import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const Sidebar = () => (
  <aside className="flex w-64 flex-col border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black">
    <div className="flex h-14 shrink-0 items-center border-b border-gray-200 dark:border-white/10 px-6">
      <span className="font-display text-sm font-semibold tracking-wide text-gray-900 dark:text-white dark:text-black">ServiceHive</span>
    </div>

    <div className="flex flex-1 flex-col overflow-y-auto p-4">
      <nav className="flex-1 space-y-1">
        <NavLink
          to="/app"
          end
          className={({ isActive }) =>
            clsx(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white dark:text-black shadow-sm ring-1 ring-gray-900/5"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/10 hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black"
            )
          }
        >
          Pipeline
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-4">
          <h4 className="text-xs font-semibold text-gray-900 dark:text-white dark:text-black">Tip</h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            Follow up within 24 hours to keep engagement high.
          </p>
        </div>
      </div>
    </div>
  </aside>
);