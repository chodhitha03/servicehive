import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => (
  <label className="flex flex-col gap-1 text-sm text-ink-700">
    {label ? <span className="font-semibold">{label}</span> : null}
    <input
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