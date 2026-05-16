import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  label?: string;
  error?: string;
}

export const Select = ({ label, error, className, ...props }: SelectProps) => (
  <label className="flex flex-col gap-1 text-sm text-ink-700">
    {label ? <span className="font-semibold">{label}</span> : null}
    <select
      className={clsx(
        "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink-900 shadow-sm outline-none transition focus:border-brand-500",
        error ? "border-rose-400" : "",
        className
      )}
      {...props}
    />
    {error ? <span className="text-xs text-rose-500">{error}</span> : null}
  </label>
);