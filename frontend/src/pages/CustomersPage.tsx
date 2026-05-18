import { useState } from "react";
import { Users, Search, MoreHorizontal, Filter, Download, Mail, Calendar, Building } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useLeads } from "../features/leads/hooks";
import { Lead } from "../types/lead";
import { useDebounce } from "../hooks/useDebounce";

export const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useLeads({ search: debouncedSearch || undefined, sort: "latest" });
  const customers = data?.leads || [];

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Customers</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage your client relationships and accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="h-9 gap-2 shadow-sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="h-9 gap-2 shadow-sm bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Users className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 dark:border-white/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="relative max-w-md w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-white dark:bg-[#0a0a0a] dark:text-white"
              placeholder="Search customers..."
            />
          </div>
          <Button variant="secondary" className="h-9 gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
            <thead className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-300">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-300">Contact</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-300">Source</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#0a0a0a]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer: Lead) => (
                  <tr key={customer._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                          {customer.name[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-gray-500"><Mail className="h-3 w-3" /> {customer.email}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span className="flex items-center gap-1 text-gray-500"><Calendar className="h-3 w-3" /> {new Date(customer.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        customer.status === "Qualified" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                        customer.status === "Contacted" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" :
                        customer.status === "New" ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                        "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400"
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {customer.source}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {data?.meta && (
          <div className="border-t border-gray-100 dark:border-white/5 p-4 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {customers.length} of {data.meta.totalRecords} results</span>
          </div>
        )}
      </div>
    </div>
  );
};
