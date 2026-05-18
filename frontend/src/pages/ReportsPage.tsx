import { useMemo } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Download,
  Calendar,
  Users,
  Target,
  Activity
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useLeads } from "../features/leads/hooks";

export const ReportsPage = () => {
  const { data } = useLeads({});
  
  const metrics = useMemo(() => {
    const leads = data?.leads || [];
    const totalLeads = data?.meta.totalRecords || 0;
    
    const qualified = leads.filter(l => l.status === "Qualified").length;
    const active = leads.filter(l => l.status !== "Lost").length;
    
    const conversionRate = totalLeads ? Math.round((qualified / totalLeads) * 100) : 0;
    
    return {
      totalLeads,
      qualified,
      active,
      conversionRate
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Measure your performance and business growth.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="h-9 gap-2 shadow-sm">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="h-9 gap-2 shadow-sm bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Leads", value: metrics.totalLeads, icon: Users, color: "text-blue-500" },
          { label: "Qualified Leads", value: metrics.qualified, icon: Target, color: "text-emerald-500" },
          { label: "Active Deals", value: metrics.active, icon: Activity, color: "text-amber-500" },
          { label: "Conversion Rate", value: `${metrics.conversionRate}%`, icon: TrendingUp, color: "text-indigo-500" }
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="mt-4 flex items-baseline gap-4">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              Real-time updated
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col p-6 min-h-[350px]">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Pipeline Growth
          </h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/[0.02]">
            <p className="text-sm text-gray-400">Not enough historical data to generate chart.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-sm flex flex-col p-6 min-h-[350px]">
          <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-amber-500" />
            Lead Sources Distribution
          </h2>
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/[0.02] p-6 gap-4">
            <div className="flex items-center justify-between w-full max-w-xs p-3 rounded-lg bg-white dark:bg-[#0a0a0a] shadow-sm border border-gray-100 dark:border-white/5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {data?.leads?.filter(l => l.source === 'Website').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between w-full max-w-xs p-3 rounded-lg bg-white dark:bg-[#0a0a0a] shadow-sm border border-gray-100 dark:border-white/5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Referral</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {data?.leads?.filter(l => l.source === 'Referral').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between w-full max-w-xs p-3 rounded-lg bg-white dark:bg-[#0a0a0a] shadow-sm border border-gray-100 dark:border-white/5">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {data?.leads?.filter(l => l.source === 'Instagram').length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
