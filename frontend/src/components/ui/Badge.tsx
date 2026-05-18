import clsx from "clsx";

interface BadgeProps {
  text: string;
  tone?: "success" | "warning" | "danger" | "neutral";
}

export const Badge = ({ text, tone = "neutral" }: BadgeProps) => {
  const tones: Record<string, string> = {
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    neutral: "bg-gray-50 dark:bg-black text-slate-700"
  };

  return (
    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone]
      )}
    >
      {text}
    </span>
  );
};