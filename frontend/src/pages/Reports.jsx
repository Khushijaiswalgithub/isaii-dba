import { TrendingUp, TrendingDown } from 'lucide-react';

const MONTHLY = [
  { month: 'Jan', leads: 8, won: 3, revenue: 220000 },
  { month: 'Feb', leads: 10, won: 4, revenue: 310000 },
  { month: 'Mar', leads: 12, won: 5, revenue: 380000 },
  { month: 'Apr', leads: 9,  won: 3, revenue: 270000 },
  { month: 'May', leads: 15, won: 7, revenue: 560000 },
];

const STATUS_DIST = [
  { label: 'Won', count: 26, color: 'bg-emerald-500 dark:bg-emerald-400', dot: 'bg-emerald-500 dark:bg-emerald-400' },
  { label: 'Lost', count: 8, color: 'bg-red-500 dark:bg-red-400', dot: 'bg-red-500 dark:bg-red-400' },
  { label: 'Proposal', count: 5, color: 'bg-purple-500 dark:bg-purple-400', dot: 'bg-purple-500 dark:bg-purple-400' },
  { label: 'Meeting Scheduled', count: 7, color: 'bg-amber-500 dark:bg-amber-400', dot: 'bg-amber-500 dark:bg-amber-400' },
  { label: 'Contacted', count: 9, color: 'bg-blue-500 dark:bg-blue-400', dot: 'bg-blue-500 dark:bg-blue-400' },
  { label: 'New', count: 4, color: 'bg-slate-500 dark:bg-slate-400', dot: 'bg-slate-500 dark:bg-slate-400' },
];

const maxRevenue = Math.max(...MONTHLY.map(m => m.revenue));
const total = STATUS_DIST.reduce((s, d) => s + d.count, 0);

const cardBase = 'p-8 sm:p-10 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-md dark:hover:bg-white/[0.08] transition-all duration-300';

const Reports = () => (
  <div className="p-8 sm:p-10 lg:p-12 max-w-[1400px] mx-auto">
    <div className="mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900 dark:text-white">Sales Reports</h1>
      <p className="text-[15px] sm:text-base text-slate-500 dark:text-slate-400">Monthly performance analytics and pipeline breakdown.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Monthly Revenue Bar Chart */}
      <div className={cardBase}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Monthly Revenue</h3>
          <span className="flex items-center gap-1.5 text-[14px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 px-3 py-1.5 rounded-lg">
            <TrendingUp size={16} strokeWidth={3} /> +18%
          </span>
        </div>
        <div className="flex items-end justify-around h-[280px] gap-6 pt-6">
          {MONTHLY.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-3 flex-1">
              <div className="flex items-end h-[240px]">
                <div
                  className="w-12 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-xl relative cursor-pointer hover:brightness-110 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group shadow-sm"
                  style={{ height: `${(m.revenue / maxRevenue) * 220}px` }}
                >
                  <span className="absolute -top-[34px] left-1/2 -translate-x-1/2 text-[12px] font-bold text-white bg-slate-900 dark:bg-black/80 px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                    ₹{(m.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
              <span className="text-[14px] text-slate-500 dark:text-slate-400 font-bold">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Distribution */}
      <div className={cardBase}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pipeline Distribution</h3>
        </div>
        <div className="flex flex-col gap-6">
          {STATUS_DIST.map((s, i) => (
            <div key={i} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`}></span>
                <span className="text-[15px] font-bold text-slate-700 dark:text-slate-200 flex-1">{s.label}</span>
                <span className="text-[15px] font-extrabold text-slate-900 dark:text-white">{s.count}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-[width] duration-[800ms] ${s.color}`} style={{ width: `${(s.count / total) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className={`${cardBase} lg:col-span-2`}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Monthly Summary</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              {['Month', 'Leads', 'Won', 'Conv. Rate', 'Revenue'].map(h => (
                <th key={h} className="py-5 px-6 text-left text-[13px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-white/10">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONTHLY.map((m, i) => {
              const conv = Math.round((m.won / m.leads) * 100);
              const prev = MONTHLY[i - 1];
              const isUp = prev ? m.revenue >= prev.revenue : true;
              return (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 text-[15px] border-b border-slate-100 dark:border-white/5"><strong className="text-slate-900 dark:text-white font-extrabold">{m.month}</strong></td>
                  <td className="py-5 px-6 text-[15px] font-medium text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-white/5">{m.leads}</td>
                  <td className="py-5 px-6 text-[15px] font-medium text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-white/5">{m.won}</td>
                  <td className="py-5 px-6 text-[15px] border-b border-slate-100 dark:border-white/5">
                    <span className={`px-2.5 py-1 rounded-lg text-[13px] font-bold ${conv >= 40 ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/15' : 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/15'}`}>{conv}%</span>
                  </td>
                  <td className="py-5 px-6 text-[15px] border-b border-slate-100 dark:border-white/5">
                    <span className="inline-flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
                      {isUp ? <TrendingUp size={16} strokeWidth={3} className="text-emerald-500 dark:text-emerald-400" /> : <TrendingDown size={16} strokeWidth={3} className="text-red-500 dark:text-red-400" />}
                      ₹{(m.revenue / 1000).toFixed(0)}K
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
);

export default Reports;
