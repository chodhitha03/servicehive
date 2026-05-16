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
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-brand-700 text-white shadow-soft hover:bg-brand-500 disabled:bg-slate-300",
    secondary:
      "border border-slate-200 bg-white text-ink-700 hover:border-brand-200",
    ghost: "text-ink-700 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-500"
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  );
};