import { useParams } from "react-router-dom";
import { useLead } from "../features/leads/hooks";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { Badge } from "../components/ui/Badge";
import { Lead } from "../types/lead";

export const LeadDetailsPage = () => {
  const { leadId } = useParams();
  const { data, isLoading, isError } = useLead(leadId ?? "");

  const statusTone = (status: Lead["status"]) => {
    switch (status) {
      case "Qualified":
        return "success" as const;
      case "Contacted":
        return "warning" as const;
      case "Lost":
        return "danger" as const;
      default:
        return "neutral" as const;
    }
  };

  if (isLoading) {
    return <EmptyState title="Loading lead" description="Fetching details..." />;
  }

  if (isError || !data) {
    return <ErrorState title="Lead not found" description="Try again later." />;
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-500">
            Lead profile
          </p>
          <h2 className="mt-2 font-display text-3xl text-gray-900 dark:text-white dark:text-black">{data.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-500">{data.email}</p>
        </div>
        <Badge text={data.status} tone={statusTone(data.status)} />
      </div>
      <div className="mt-6 grid gap-4 text-sm text-ink-700 md:grid-cols-3">
        <div className="rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Source</p>
          <p className="mt-2 font-semibold text-gray-900 dark:text-white dark:text-black">{data.source}</p>
        </div>
        <div className="rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Assigned to
          </p>
          <p className="mt-2 font-semibold text-gray-900 dark:text-white dark:text-black">
            {data.assignedTo?.name ?? "Unassigned"}
          </p>
        </div>
        <div className="rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Created</p>
          <p className="mt-2 font-semibold text-gray-900 dark:text-white dark:text-black">
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};