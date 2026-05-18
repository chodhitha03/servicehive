import { LeadFilters as Filters } from "../../types/lead";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

interface LeadFiltersProps {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onClear: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const LeadFilters = ({
  filters,
  onChange,
  onClear,
  search,
  onSearchChange
}: LeadFiltersProps) => (
  <div className="grid gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 shadow-soft lg:grid-cols-4">
    <Input
      label="Search"
      placeholder="Search by name or email"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
    />
    <Select
      label="Status"
      value={filters.status ?? ""}
      onChange={(event) => onChange({ status: event.target.value || undefined })}
    >
      <option value="">All</option>
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Lost">Lost</option>
    </Select>
    <Select
      label="Source"
      value={filters.source ?? ""}
      onChange={(event) => onChange({ source: event.target.value || undefined })}
    >
      <option value="">All</option>
      <option value="Website">Website</option>
      <option value="Instagram">Instagram</option>
      <option value="Referral">Referral</option>
    </Select>
    <div className="flex flex-col gap-2">
      <Select
        label="Sort"
        value={filters.sort ?? "latest"}
        onChange={(event) => onChange({ sort: event.target.value as Filters["sort"] })}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </Select>
      <Button variant="ghost" className="self-start" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  </div>
);