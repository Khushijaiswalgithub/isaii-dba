import { useState } from 'react';
import { X, Building2, Mail, Phone, DollarSign, StickyNote } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal', 'Won', 'Lost'];

const LeadModal = ({ onClose, onSave, lead = null }) => {
  const [form, setForm] = useState({
    name: lead?.name || '',
    company: lead?.company || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    status: lead?.status || 'New',
    value: lead?.value || '',
    notes: lead?.notes || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) return;
    onSave({ ...form, value: Number(form.value) || 0 });
    onClose();
  };

  const inputBase = 'w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white font-[inherit] text-[14px] transition-all duration-300 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-slate-400 dark:placeholder:text-slate-500';

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] animate-[fadeIn_0.2s_ease]" onClick={onClose}>
      <div
        className="w-[720px] max-w-[95vw] max-h-[90vh] overflow-y-auto p-8 sm:p-10 bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] animate-[slideUp_0.25s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all duration-300 cursor-pointer" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Contact Name *</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input className={`${inputBase} pl-12`} type="text" name="name" placeholder="e.g. Raj Kumar" value={form.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Company Name *</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input className={`${inputBase} pl-12`} type="text" name="company" placeholder="e.g. Mahindra Corp" value={form.company} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Email *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input className={`${inputBase} pl-12`} type="email" name="email" placeholder="contact@company.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Phone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input className={`${inputBase} pl-12`} type="text" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Deal Value (₹)</label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input className={`${inputBase} pl-12`} type="number" name="value" placeholder="e.g. 250000" value={form.value} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Status</label>
              <select className={`${inputBase} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_16px_center] pr-10`} name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map(s => <option key={s} value={s} className="bg-white dark:bg-[#1a1d2d] text-slate-900 dark:text-white">{s}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">Notes</label>
            <div className="relative">
              <StickyNote size={18} className="absolute left-4 top-4 text-slate-400 pointer-events-none" />
              <textarea className={`${inputBase} pl-12 resize-y min-h-[100px]`} name="notes" rows="3" placeholder="Add any relevant notes about this lead..." value={form.notes} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-white/10 mt-2">
            <button type="button" className="px-6 py-3 rounded-xl text-[15px] font-bold text-slate-500 dark:text-slate-400 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all duration-300 cursor-pointer" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-8 py-3 rounded-xl text-[15px] font-bold bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer">
              {lead ? 'Save Changes' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
