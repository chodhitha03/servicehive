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
import { 
  Users, 
  Target, 
  Activity, 
  Download,
  Plus,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pipeline Overview</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Track and manage your active lead flow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleExport} className="h-9 gap-2 shadow-sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={openCreate} className="h-9 gap-2 shadow-sm bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Leads", value: totalLeads.toString(), trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
          { label: "Active in Pipeline", value: activeLeads.toString(), trend: "+5%", icon: Activity, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Conversion Rate", value: `${conversionRate}%`, trend: "+2.1%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" }
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col overflow-hidden">
          <div className="border-b border-gray-100 dark:border-white/5 p-5 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              Lead Database
            </h2>
          </div>
          <div className="flex-1 p-5 overflow-hidden flex flex-col min-h-[400px]">
            <LeadFilters
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClear}
              search={search}
              onSearchChange={setSearch}
            />
            
            <div className="mt-5 flex-1">
              {isLoading && <EmptyState title="Loading leads" description="Fetching pipeline..." />}
              {isError && <ErrorState title="Unable to load leads" description="Try again soon." />}
              {data?.leads.length === 0 && (
                <EmptyState
                  title="No leads found"
                  description="Try adjusting your filters or create a new lead."
                  action={<Button onClick={openCreate} className="mt-2 h-9 bg-blue-600 hover:bg-blue-700 text-white border-0">Add Lead</Button>}
                />
              )}
              {data && data.leads.length > 0 && (
                <div className="rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10">
                  <LeadsTable leads={data.leads} onEdit={openEdit} onDelete={handleDelete} />
                </div>
              )}
            </div>

            {data && data.leads.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/5">
                <Pagination
                  meta={data.meta}
                  onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                />
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col overflow-hidden">
          <div className="border-b border-gray-100 dark:border-white/5 p-5 bg-gray-50/50 dark:bg-white/[0.02]">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-400" />
              Pipeline Health
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {([
                { label: "New", value: statusCounts.New, color: "bg-blue-500", text: "text-blue-700 dark:text-blue-400" },
                { label: "Contacted", value: statusCounts.Contacted, color: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
                { label: "Qualified", value: statusCounts.Qualified, color: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
                { label: "Lost", value: statusCounts.Lost, color: "bg-rose-500", text: "text-rose-700 dark:text-rose-400" }
              ] as const).map((row) => (
                <div key={row.label} className="group">
                  <div className="flex items-center justify-between text-sm font-medium mb-2">
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{row.label}</span>
                    <span className={`font-semibold ${row.text}`}>{row.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color} transition-all duration-500 ease-out`}
                      style={{ width: `${progressFor(row.value)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Top Performing Source
              </h3>
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-white/5 dark:to-transparent border border-gray-100 dark:border-white/10">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{topSourceLabel}</span>
                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                  {topSourceValue} leads
                </span>
              </div>
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