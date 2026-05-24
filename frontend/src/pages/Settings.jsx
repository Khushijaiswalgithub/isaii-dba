import { Save, Moon, Sun, Globe, Bell } from 'lucide-react';

const inputBase = 'w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3.5 text-slate-900 dark:text-white font-[inherit] text-[14px] transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]';
const cardBase = 'p-8 sm:p-10 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] dark:hover:bg-white/[0.08] transition-all duration-300';

const Settings = ({ darkMode, setDarkMode }) => {
  return (
    <div className="p-8 sm:p-10 lg:p-12 max-w-[900px] w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Settings</h1>
        <p className="text-[15px] text-slate-500 dark:text-slate-400">Configure your CRM preferences and workspace.</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Profile */}
        <div className={cardBase}>
          <h3 className="text-xl font-bold mb-8 pb-4 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">Profile</h3>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                <input className={inputBase} defaultValue="Alex BDA" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Email</label>
                <input className={inputBase} defaultValue="alex@isaii.in" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Role</label>
                <input className={inputBase} defaultValue="Senior Business Development Associate" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Department</label>
                <input className={inputBase} defaultValue="Manufacturing Sales" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={cardBase}>
          <h3 className="text-xl font-bold mb-8 pb-4 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">Preferences</h3>
          <div className="flex flex-col gap-6">
            {/* Dark Mode */}
            <div className="flex items-center justify-between py-5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-400/12 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-slate-900 dark:text-white mb-1">Dark Mode</h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">Use dark theme across the application</p>
                </div>
              </div>
              <label className="relative w-14 h-7 cursor-pointer">
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="sr-only peer" />
                <span className="absolute inset-0 bg-slate-200 dark:bg-white/10 rounded-full transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:left-[4px] after:top-[4px] after:w-[20px] after:h-[20px] after:rounded-full after:bg-white after:shadow-sm after:transition-all after:duration-300 peer-checked:after:translate-x-7"></span>
              </label>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between py-5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-400/12 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Bell size={20} />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-slate-900 dark:text-white mb-1">Email Notifications</h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">Receive email updates for new leads and status changes</p>
                </div>
              </div>
              <label className="relative w-14 h-7 cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <span className="absolute inset-0 bg-slate-200 dark:bg-white/10 rounded-full transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:left-[4px] after:top-[4px] after:w-[20px] after:h-[20px] after:rounded-full after:bg-white after:shadow-sm after:transition-all after:duration-300 peer-checked:after:translate-x-7"></span>
              </label>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between py-5">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-400/12 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-slate-900 dark:text-white mb-1">Language</h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">Select your preferred display language</p>
                </div>
              </div>
              <select className={`${inputBase} max-w-[180px] cursor-pointer`}>
                <option className="bg-white dark:bg-[#1a1d2d] text-slate-900 dark:text-white">English</option>
                <option className="bg-white dark:bg-[#1a1d2d] text-slate-900 dark:text-white">Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Config */}
        <div className={cardBase}>
          <h3 className="text-xl font-bold mb-8 pb-4 border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">API Configuration</h3>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Backend URL</label>
              <input className={inputBase} defaultValue="http://localhost:5000" />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">MongoDB URI</label>
              <input className={inputBase} defaultValue="mongodb+srv://khushijaiswal:khushijaiswal123@cluster0.xouecbx.mongodb.net/isaii-crm" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-[15px] bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
