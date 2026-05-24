import { Bell, Search, Menu } from 'lucide-react';

const Topbar = ({ onNewLead, onMenuClick }) => {
  return (
    <header className="h-[88px] border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 sm:px-12 bg-white/80 dark:bg-[#0f111a]/50 backdrop-blur-xl sticky top-0 z-40 gap-8 w-full transition-colors duration-300">
      
      {/* Left section: Hamburger & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-[600px]">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Responsive Search Input */}
        <div className="flex items-center bg-slate-100 dark:bg-black/25 border border-transparent dark:border-white/10 rounded-2xl px-5 py-3 w-full max-w-[240px] sm:max-w-[320px] md:max-w-[400px] focus-within:max-w-[280px] sm:focus-within:max-w-[400px] md:focus-within:max-w-[480px] focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] dark:focus-within:bg-black/40 transition-all duration-300">
          <Search className="text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" size={20} strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search leads..."
            className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full font-[inherit] text-[15px] font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right section: Notifications & Actions */}
      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
        {/* Notifications Icon */}
        <button className="bg-transparent border border-slate-200 dark:border-white/10 rounded-xl w-11 h-11 flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer relative hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all duration-300">
          <Bell size={22} strokeWidth={2.5} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0f111a] shadow-sm">3</span>
        </button>

        {/* Action Button: responsive text */}
        <button
          onClick={onNewLead}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] cursor-pointer bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(59,130,246,0.4)] transition-all duration-300"
        >
          <span className="hidden sm:inline">+ Add New Lead</span>
          <span className="sm:hidden">+ Lead</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
