import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="rounded-xl border border-dashed border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-8 text-center shadow-soft">
    <h3 className="font-display text-xl text-gray-900 dark:text-white dark:text-black">{title}</h3>
    {description ? (
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">{description}</p>
    ) : null}
    {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
  </div>
);