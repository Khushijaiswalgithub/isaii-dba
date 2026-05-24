import { Trophy, Target, TrendingUp, Phone, Mail } from 'lucide-react';

const TEAM = [
  { name: 'Priya Sharma', role: 'Senior BDA', avatar: 'https://i.pravatar.cc/150?img=47', leads: 14, won: 8, contacted: 4, revenue: 680000, phone: '+91 98765 11111', email: 'priya@isaii.in' },
  { name: 'Arjun Mehta', role: 'BDA', avatar: 'https://i.pravatar.cc/150?img=12', leads: 11, won: 5, contacted: 4, revenue: 415000, phone: '+91 98765 22222', email: 'arjun@isaii.in' },
  { name: 'Sneha Patel', role: 'BDA', avatar: 'https://i.pravatar.cc/150?img=23', leads: 9, won: 6, contacted: 2, revenue: 520000, phone: '+91 98765 33333', email: 'sneha@isaii.in' },
  { name: 'Vikram Singh', role: 'Junior BDA', avatar: 'https://i.pravatar.cc/150?img=8', leads: 7, won: 3, contacted: 3, revenue: 210000, phone: '+91 98765 44444', email: 'vikram@isaii.in' },
];

const MEDALS = ['🥇', '🥈', '🥉', ''];

const Team = () => (
  <div className="p-8 sm:p-10 lg:p-12 max-w-[1600px] mx-auto">
    <div className="mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900 dark:text-white">BDA Team</h1>
      <p className="text-[15px] sm:text-base text-slate-500 dark:text-slate-400">Track individual performance and manage your sales team.</p>
    </div>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10">
      {TEAM.map((member, i) => {
        const convRate = Math.round((member.won / member.leads) * 100);
        return (
          <div key={i} className="p-8 sm:p-10 flex flex-col gap-8 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:shadow-md dark:hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
            {/* Top Section */}
            <div className="flex flex-col items-center text-center gap-2.5">
              <span className="text-3xl leading-none mb-1">{MEDALS[i] || `#${i + 1}`}</span>
              <img src={member.avatar} alt={member.name} className="w-[88px] h-[88px] rounded-full object-cover border-[4px] border-white dark:border-white/10 shadow-md" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">{member.name}</h3>
              <span className="text-[13px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-3 py-1 rounded-full font-bold">{member.role}</span>
              <div className="flex flex-col items-center gap-1.5 mt-2">
                <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2"><Phone size={14} /> {member.phone}</span>
                <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2"><Mail size={14} /> {member.email}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between py-6 border-t border-b border-slate-100 dark:border-white/10 gap-4">
              {[
                { icon: <Target size={18} strokeWidth={2.5} />, label: 'Total Leads', val: member.leads, iconBg: 'bg-blue-50 dark:bg-blue-400/15', iconColor: 'text-blue-600 dark:text-blue-400' },
                { icon: <Trophy size={18} strokeWidth={2.5} />, label: 'Won', val: member.won, iconBg: 'bg-emerald-50 dark:bg-emerald-400/15', iconColor: 'text-emerald-600 dark:text-emerald-400' },
                { icon: <TrendingUp size={18} strokeWidth={2.5} />, label: 'Conv. Rate', val: `${convRate}%`, iconBg: 'bg-amber-50 dark:bg-amber-400/15', iconColor: 'text-amber-600 dark:text-amber-400' },
              ].map((stat, j) => (
                <div key={j} className="flex items-center gap-3 flex-1 flex-col sm:flex-row text-center sm:text-left">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.iconBg} ${stat.iconColor} shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">{stat.label}</p>
                    <h4 className="text-[17px] font-extrabold text-slate-900 dark:text-white">{stat.val}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-[14px] font-semibold text-slate-500 dark:text-slate-400">
                <span>Revenue Generated</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{(member.revenue / 100000).toFixed(1)}L</strong>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.08] rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-[width] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ width: `${(member.revenue / 680000) * 100}%` }}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Team;
