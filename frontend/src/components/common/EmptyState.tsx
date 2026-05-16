import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center shadow-card">
    <h3 className="font-display text-xl text-ink-900">{title}</h3>
    {description ? (
      <p className="mt-2 text-sm text-ink-500">{description}</p>
    ) : null}
    {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
  </div>
);