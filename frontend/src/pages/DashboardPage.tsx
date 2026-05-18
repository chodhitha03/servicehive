import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { LeadFilters } from "../components/forms/LeadFilters";
import { LeadsTable } from "../components/tables/LeadsTable";
import { Pagination } from "../components/common/Pagination";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { LeadFormModal } from "../components/forms/LeadFormModal";
import { useDebounce } from "../hooks/useDebounce";
import { useDeleteLead, useExportLeads, useLeads } from "../features/leads/hooks";
import { Lead, LeadFilters as Filters } from "../types/lead";
import { downloadCsv } from "../utils/csv";

export const DashboardPage = () => {
  const [filters, setFilters] = useState<Filters>({ sort: "latest", page: 1 });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const effectiveFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined }),
    [filters, debouncedSearch]
  );

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useLeads(effectiveFilters);
  const deleteMutation = useDeleteLead();
  const exportMutation = useExportLeads();

  const { statusCounts, sourceCounts } = useMemo(() => {
    const initialStatus: Record<Lead["status"], number> = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      Lost: 0
    };
    const initialSource: Record<Lead["source"], number> = {
      Website: 0,
      Instagram: 0,
      Referral: 0
    };

    (data?.leads ?? []).forEach((lead) => {
      initialStatus[lead.status] += 1;
      initialSource[lead.source] += 1;
    });

    return { statusCounts: initialStatus, sourceCounts: initialSource };
  }, [data]);

  const totalLeads = data?.meta.totalRecords ?? 0;
  const pageLeads = data?.leads.length ?? 0;
  const qualifiedLeads = statusCounts.Qualified;
  const activeLeads = statusCounts.New + statusCounts.Contacted + statusCounts.Qualified;
  const conversionRate = totalLeads
    ? Math.round((qualifiedLeads / totalLeads) * 100)
    : 0;
  const topSource = (Object.entries(sourceCounts) as Array<[Lead["source"], number]>).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const topSourceLabel = topSource?.[0] ?? "Website";
  const topSourceValue = topSource?.[1] ?? 0;
  const progressFor = (value: number) =>
    pageLeads ? Math.round((value / pageLeads) * 100) : 0;

  const handleFilterChange = (next: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...next, page: 1 }));

  const handleClear = () => {
    setFilters({ sort: "latest", page: 1 });
    setSearch("");
  };

  const openCreate = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleDelete = async (lead: Lead) => {
    await deleteMutation.mutateAsync(lead._id);
  };

  const handleExport = async () => {
    const csv = await exportMutation.mutateAsync(effectiveFilters);
    downloadCsv(csv, "servicehive-leads.csv");
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Pipeline Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage your active lead flow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleExport} className="h-9">
            Export CSV
          </Button>
          <Button onClick={openCreate} className="h-9">
            Add Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total leads", value: totalLeads.toString(), trend: "+12%" },
          { label: "Active in play", value: activeLeads.toString(), trend: "+5%" },
          { label: "Conversion rate", value: `${conversionRate}%`, trend: "+2.1%" }
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col">
          <div className="border-b border-gray-100 dark:border-white/5 p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white">Lead Database</h2>
          </div>
          <div className="flex-1 p-5 overflow-hidden flex flex-col min-h-[400px]">
            <LeadFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClear}
              search={search}
              onSearchChange={setSearch}
            />
            
            <div className="mt-4 flex-1">
              {isLoading && <EmptyState title="Loading leads" description="Fetching pipeline..." />}
              {isError && <ErrorState title="Unable to load leads" description="Try again soon." />}
              {data?.leads.length === 0 && (
                <EmptyState
                  title="No leads found"
                  description="Try adjusting your filters or create a new lead."
                  action={<Button onClick={openCreate} className="mt-2 h-9">Add Lead</Button>}
                />
              )}
              {data && data.leads.length > 0 && (
                <div className="rounded-lg border border-gray-100 dark:border-white/5 overflow-hidden">
                  <LeadsTable leads={data.leads} onEdit={openEdit} onDelete={handleDelete} />
                </div>
              )}
            </div>

            {data && data.leads.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <Pagination
                  meta={data.meta}
                  onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-6">Pipeline Health</h2>
          
          <div className="space-y-6">
            {([
              { label: "New", value: statusCounts.New, color: "bg-blue-500" },
              { label: "Contacted", value: statusCounts.Contacted, color: "bg-amber-500" },
              { label: "Qualified", value: statusCounts.Qualified, color: "bg-emerald-500" },
              { label: "Lost", value: statusCounts.Lost, color: "bg-rose-500" }
            ] as const).map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm font-medium mb-2">
                  <span className="text-gray-600 dark:text-gray-400">{row.label}</span>
                  <span className="text-gray-900 dark:text-white">{row.value}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.color}`}
                    style={{ width: `${progressFor(row.value)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Top Source</h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{topSourceLabel}</span>
              <span className="text-sm font-medium text-gray-500">{topSourceValue} leads</span>
            </div>
          </div>
        </div>
      </div>

      <LeadFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lead={selectedLead}
      />
    </div>
  );
};