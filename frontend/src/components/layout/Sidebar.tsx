import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings,
  Bell,
  Sparkles
} from "lucide-react";

export const Sidebar = () => (
  <aside className="flex w-64 flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-all duration-300 hidden md:flex shrink-0">
    <div className="flex h-16 shrink-0 items-center px-6 border-b border-transparent">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-gray-900 dark:bg-white text-white dark:text-black">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">ServiceHive</span>
      </div>
    </div>

    <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4 scrollbar-hide">
      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Overview
      </div>
      <nav className="flex-1 space-y-1">
        <NavLink
          to="/app"
          end
          className={({ isActive }) =>
            clsx(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            )
          }
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          Pipeline
        </NavLink>
        <NavLink
          to="/app/customers"
          className={({ isActive }) =>
            clsx(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            )
          }
        >
          <Users className="h-4 w-4 shrink-0" />
          Customers
        </NavLink>
        <NavLink
          to="/app/reports"
          className={({ isActive }) =>
            clsx(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            )
          }
        >
          <BarChart3 className="h-4 w-4 shrink-0" />
          Reports
        </NavLink>
      </nav>

      <div className="mt-8 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        System
      </div>
      <nav className="space-y-1">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            clsx(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            )
          }
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </NavLink>
        <button
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <Bell className="h-4 w-4 shrink-0" />
          Notifications
          <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
            3
          </span>
        </button>
      </nav>

      <div className="mt-auto pt-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 p-4 border border-blue-100 dark:border-blue-500/20">
          <div className="relative z-10">
            <h4 className="text-xs font-semibold text-blue-900 dark:text-blue-300">Upgrade to Pro</h4>
            <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
              Unlock advanced analytics and team collaboration features.
            </p>
            <button className="mt-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Explore plans &rarr;
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Sparkles className="h-24 w-24 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  </aside>
);