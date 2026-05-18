import { ReactNode } from "react";

interface ErrorStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const ErrorState = ({ title, description, action }: ErrorStateProps) => (
  <div className="rounded-xl border border-rose-100 bg-rose-50/90 p-6 shadow-soft">
    <h3 className="font-display text-lg text-rose-700">{title}</h3>
    {description ? (
      <p className="mt-2 text-sm text-rose-600">{description}</p>
    ) : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);