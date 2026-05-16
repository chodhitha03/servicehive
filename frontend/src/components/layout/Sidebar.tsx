import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const Sidebar = () => (
  <aside className="hidden min-h-screen w-64 flex-col gap-8 bg-white/80 p-6 shadow-card lg:flex">
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-sand-400">ServiceHive</p>
      <h1 className="font-display text-2xl text-ink-900">Leads HQ</h1>
    </div>

    <nav className="flex flex-col gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            "rounded-xl px-3 py-2 text-sm font-semibold",
            isActive
              ? "bg-brand-50 text-brand-700"
              : "text-ink-600 hover:bg-slate-100"
          )
        }
      >
        Pipeline
      </NavLink>
    </nav>

    <div className="mt-auto rounded-2xl bg-sand-50 p-4 text-sm text-ink-600">
      <p className="font-semibold text-ink-900">Tip of the day</p>
      <p className="mt-1">Follow up within 24h to increase qualification rates.</p>
    </div>
  </aside>
);