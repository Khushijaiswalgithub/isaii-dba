import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MOCK_LEADS = [
  { name: 'Ramesh Industries', bda: 'Priya Sharma', value: 250000, status: 'Won', change: 12 },
  { name: 'Mahindra Corp', bda: 'Arjun Mehta', value: 180000, status: 'Proposal', change: 8 },
  { name: 'Tata Solutions', bda: 'Sneha Patel', value: 320000, status: 'Won', change: -3 },
  { name: 'Bajaj Electronics', bda: 'Vikram Singh', value: 95000, status: 'Contacted', change: 5 },
  { name: 'Wipro Mfg', bda: 'Priya Sharma', value: 430000, status: 'Meeting Scheduled', change: 22 },
];

const TEAM_PERFORMANCE = [
  { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=47', leads: 14, won: 8, revenue: 680000 },
  { name: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/150?img=12', leads: 11, won: 5, revenue: 415000 },
  { name: 'Sneha Patel', avatar: 'https://i.pravatar.cc/150?img=23', leads: 9, won: 6, revenue: 520000 },
  { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=8', leads: 7, won: 3, revenue: 210000 },
];

const statusColors = {
  Won: { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-400/10' },
  Lost: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-400/10' },
  Proposal: { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-400/10' },
  'Meeting Scheduled': { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-400/10' },
  Contacted: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-400/10' },
  New: { text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-100 dark:bg-slate-400/10' },
};

const MetricCard = ({ icon, title, value, change, color, bgColor }) => {
  const isPositive = change >= 0;
  return (
    <div className="p-8 flex items-center gap-6 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] dark:hover:bg-white/[0.08] hover:-translate-y-1 dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-300">
      <div className={`w-[60px] h-[60px] rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[15px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{title}</p>
        <h2 className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">{value}</h2>
        <div className={`flex items-center gap-1.5 text-sm font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={16} strokeWidth={3} /> : <ArrowDownRight size={16} strokeWidth={3} />}
          <span>{Math.abs(change)}% this month</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onNewLead }) => {
  const metrics = [
    { icon: <Target size={28} />, title: 'Total Leads', value: '41', change: 12, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-400/15' },
    { icon: <TrendingUp size={28} />, title: 'Conversion Rate', value: '34%', change: 5, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-400/15' },
    { icon: <DollarSign size={28} />, title: 'Revenue Pipeline', value: '₹18.2L', change: 18, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-400/15' },
    { icon: <Users size={28} />, title: 'Active BDAs', value: '4', change: 0, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-400/15' },
  ];

  return (
    <div className="p-8 sm:p-10 lg:p-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900 dark:text-white">Overview Dashboard</h1>
          <p className="text-[15px] sm:text-base text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening with your team today.</p>
        </div>
        <button
          onClick={onNewLead}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-[15px] bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer w-full sm:w-auto"
        >
          + Add New Lead
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Recent Leads */}
        <div className="p-8 sm:p-10 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] dark:hover:bg-white/[0.08] transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Leads</h3>
            <a href="/pipeline" className="text-blue-600 dark:text-blue-400 text-[15px] font-bold no-underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">See all →</a>
          </div>
          <div className="flex flex-col gap-6">
            {MOCK_LEADS.map((lead, i) => {
              const sc = statusColors[lead.status];
              return (
                <div key={i} className="flex items-center justify-between py-5 border-b border-slate-100 dark:border-white/10 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-5">
                    <div className="w-[48px] h-[48px] rounded-[12px] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xl text-white flex-shrink-0 shadow-md">
                      {lead.name[0]}
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-slate-900 dark:text-white">{lead.name}</h4>
                      <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mt-1">{lead.bda}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[13px] font-bold whitespace-nowrap ${sc.text} ${sc.bg}`}>
                      {lead.status}
                    </span>
                    <span className="text-[17px] font-extrabold text-slate-900 dark:text-white">₹{(lead.value / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Performance */}
        <div className="p-8 sm:p-10 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] dark:hover:bg-white/[0.08] transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Team Leaderboard</h3>
          </div>
          <div className="flex flex-col gap-7">
            {TEAM_PERFORMANCE.map((member, i) => (
              <div key={i} className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-white/10 last:border-b-0 last:pb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[15px] font-extrabold flex-shrink-0 ${i === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md' : 'bg-slate-100 dark:bg-white/[0.08] text-slate-500 dark:text-slate-400'}`}>
                  {i + 1}
                </div>
                <img src={member.avatar} alt={member.name} className="w-[50px] h-[50px] rounded-full object-cover border-[3px] border-white dark:border-white/10 shadow-sm" />
                <div className="flex-1">
                  <h4 className="text-[17px] font-bold text-slate-900 dark:text-white">{member.name}</h4>
                  <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mt-1">{member.leads} leads · {member.won} won</p>
                </div>
                <div className="flex flex-col items-end gap-2.5 min-w-[100px]">
                  <span className="text-[17px] font-extrabold text-emerald-600 dark:text-emerald-400">₹{(member.revenue / 100000).toFixed(1)}L</span>
                  <div className="w-24 h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-[width] duration-700" style={{ width: `${(member.revenue / 680000) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
