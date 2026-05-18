import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 shadow-sm",
    secondary:
      "border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white dark:text-black hover:bg-gray-50 dark:hover:bg-white/5 dark:bg-black shadow-sm",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 dark:bg-white/10 hover:text-gray-900 dark:hover:text-white dark:text-white dark:text-black",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-transparent"
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  );
};