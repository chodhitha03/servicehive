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
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-ink-900">Lead Pipeline</h2>
          <p className="text-sm text-ink-500">
            Track, qualify, and follow up on every opportunity.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport}>
            Export CSV
          </Button>
          <Button onClick={openCreate}>New Lead</Button>
        </div>
      </div>

      <LeadFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        search={search}
        onSearchChange={setSearch}
      />

      {isLoading ? (
        <EmptyState title="Loading leads" description="Fetching pipeline..." />
      ) : null}

      {isError ? (
        <ErrorState title="Unable to load leads" description="Try again soon." />
      ) : null}

      {data && data.leads.length === 0 ? (
        <EmptyState
          title="No leads yet"
          description="Create your first lead to get the pipeline moving."
          action={<Button onClick={openCreate}>Add lead</Button>}
        />
      ) : null}

      {data && data.leads.length > 0 ? (
        <LeadsTable leads={data.leads} onEdit={openEdit} onDelete={handleDelete} />
      ) : null}

      {data ? (
        <Pagination
          meta={data.meta}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      ) : null}

      <LeadFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lead={selectedLead}
      />
    </div>
  );
};