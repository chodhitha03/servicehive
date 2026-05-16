import { useParams } from "react-router-dom";
import { useLead } from "../features/leads/hooks";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { Badge } from "../components/ui/Badge";

export const LeadDetailsPage = () => {
  const { leadId } = useParams();
  const { data, isLoading, isError } = useLead(leadId ?? "");

  if (isLoading) {
    return <EmptyState title="Loading lead" description="Fetching details..." />;
  }

  if (isError || !data) {
    return <ErrorState title="Lead not found" description="Try again later." />;
  }

  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-ink-900">{data.name}</h2>
          <p className="text-sm text-ink-500">{data.email}</p>
        </div>
        <Badge text={data.status} />
      </div>
      <div className="mt-6 grid gap-4 text-sm text-ink-700 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400">Source</p>
          <p className="font-semibold">{data.source}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
            Assigned to
          </p>
          <p className="font-semibold">{data.assignedTo?.name ?? "Unassigned"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
            Created
          </p>
          <p className="font-semibold">
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};