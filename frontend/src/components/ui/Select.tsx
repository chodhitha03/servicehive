import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";

interface SelectProps extends ComponentPropsWithRef<"select"> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex flex-col gap-1 text-sm text-ink-700">
      {label ? <span className="font-semibold">{label}</span> : null}
      <select
        ref={ref}
        className={clsx(
          "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink-900 shadow-sm outline-none transition focus:border-brand-500",
          error ? "border-rose-400" : "",
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  )
);

Select.displayName = "Select";