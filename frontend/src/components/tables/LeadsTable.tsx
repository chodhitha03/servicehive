import { Link } from "react-router-dom";
import { Lead } from "../../types/lead";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const statusTone = (status: Lead["status"]) => {
  switch (status) {
    case "Qualified":
      return "success";
    case "Contacted":
      return "warning";
    case "Lost":
      return "danger";
    default:
      return "neutral";
  }
};

export const LeadsTable = ({ leads, onEdit, onDelete }: LeadsTableProps) => (
  <div className="overflow-x-auto rounded-xl bg-white dark:bg-[#0a0a0a] shadow-soft">
    <table className="min-w-[760px] w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-500">
        <tr>
          <th className="px-4 py-3">Lead</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Source</th>
          <th className="px-4 py-3">Assigned</th>
          <th className="px-4 py-3">Created</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {leads.map((lead) => (
          <tr key={lead._id} className="text-ink-700">
            <td className="px-4 py-3">
              <Link
                to={`/app/leads/${lead._id}`}
                className="font-semibold text-gray-900 dark:text-white dark:text-black hover:text-brand-700"
              >
                {lead.name}
              </Link>
              <div className="text-xs text-gray-500 dark:text-gray-500">{lead.email}</div>
            </td>
            <td className="px-4 py-3">
              <Badge text={lead.status} tone={statusTone(lead.status)} />
            </td>
            <td className="px-4 py-3">{lead.source}</td>
            <td className="px-4 py-3">
              {lead.assignedTo?.name ?? "Unassigned"}
            </td>
            <td className="px-4 py-3">
              {new Date(lead.createdAt).toLocaleDateString()}
            </td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => onEdit(lead)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(lead)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);