import { NavLink } from 'react-router-dom';
import { LayoutDashboard, KanbanSquare, Users, Settings, PieChart, X } from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={22} strokeWidth={2.5} />, label: 'Dashboard', path: '/' },
  { icon: <KanbanSquare size={22} strokeWidth={2.5} />, label: 'Pipeline', path: '/pipeline' },
  { icon: <Users size={22} strokeWidth={2.5} />, label: 'Team', path: '/team' },
  { icon: <PieChart size={22} strokeWidth={2.5} />, label: 'Reports', path: '/reports' },
  { icon: <Settings size={22} strokeWidth={2.5} />, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-45 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-out w-[280px] border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0d16] md:bg-white/80 md:dark:bg-[#0f111a]/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col shadow-2xl md:shadow-none flex-shrink-0`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-400 dark:bg-clip-text">
              Isaii CRM
            </h2>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3.5 flex-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-300 text-[15px]
                ${isActive
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-l-[4px] border-blue-600 dark:border-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border-l-[4px] border-transparent'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Footer Profile */}
        <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-white/10"
            />
            <div>
              <h4 className="text-[15px] font-bold text-slate-900 dark:text-white">Alex BDA</h4>
              <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
