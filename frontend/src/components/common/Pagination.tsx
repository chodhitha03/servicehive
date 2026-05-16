import { LeadListMeta } from "../../types/lead";
import { Button } from "../ui/Button";

interface PaginationProps {
  meta: LeadListMeta;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  if (meta.totalRecords === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-card">
      <p className="text-sm text-ink-500">
        Page {meta.currentPage} of {meta.totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          disabled={!meta.hasPrevPage}
          onClick={() => onPageChange(meta.currentPage - 1)}
        >
          Prev
        </Button>
        <Button
          variant="secondary"
          disabled={!meta.hasNextPage}
          onClick={() => onPageChange(meta.currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};