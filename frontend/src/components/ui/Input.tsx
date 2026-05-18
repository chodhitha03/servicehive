import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-500">
      {label ? <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span> : null}
      <input
        ref={ref}
        className={clsx(
          "rounded-md border border-gray-300 dark:border-white/20 bg-white dark:bg-[#0a0a0a] px-3 py-2 text-sm text-gray-900 dark:text-white dark:text-black shadow-sm outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500 placeholder:text-gray-400",
          error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500" : "",
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-rose-500">{error}</span> : null}
    </label>
  )
);

Input.displayName = "Input";