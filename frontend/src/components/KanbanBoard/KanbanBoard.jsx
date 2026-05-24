import { useState } from 'react';
import { Edit2, Trash2, DollarSign, Mail, Phone } from 'lucide-react';

const COLUMNS = [
  { id: 'New', label: 'New', color: 'bg-slate-500 dark:bg-slate-400', textColor: 'text-slate-600 dark:text-slate-400', lightBg: 'bg-slate-100 dark:bg-slate-400/10' },
  { id: 'Contacted', label: 'Contacted', color: 'bg-blue-500 dark:bg-blue-400', textColor: 'text-blue-600 dark:text-blue-400', lightBg: 'bg-blue-100 dark:bg-blue-400/10' },
  { id: 'Meeting Scheduled', label: 'Meeting', color: 'bg-amber-500 dark:bg-amber-400', textColor: 'text-amber-600 dark:text-amber-400', lightBg: 'bg-amber-100 dark:bg-amber-400/10' },
  { id: 'Proposal', label: 'Proposal', color: 'bg-purple-500 dark:bg-purple-400', textColor: 'text-purple-600 dark:text-purple-400', lightBg: 'bg-purple-100 dark:bg-purple-400/10' },
  { id: 'Won', label: 'Won', color: 'bg-emerald-500 dark:bg-emerald-400', textColor: 'text-emerald-600 dark:text-emerald-400', lightBg: 'bg-emerald-100 dark:bg-emerald-400/10' },
  { id: 'Lost', label: 'Lost', color: 'bg-red-500 dark:bg-red-400', textColor: 'text-red-600 dark:text-red-400', lightBg: 'bg-red-100 dark:bg-red-400/10' },
];

const LeadCard = ({ lead, onEdit, onDelete, onDragStart }) => (
  <div
    className="p-6 cursor-grab active:cursor-grabbing active:opacity-80 active:scale-[0.98] active:rotate-1 select-none bg-white dark:bg-white/5 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] hover:bg-slate-50 dark:hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 group"
    draggable
    onDragStart={(e) => onDragStart(e, lead)}
  >
    {/* Card Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="w-[36px] h-[36px] rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[15px] font-bold text-white shadow-sm">
        {lead.company[0]}
      </div>
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="bg-slate-100 dark:bg-white/10 border-none rounded-md px-2 py-1.5 text-slate-500 dark:text-slate-400 cursor-pointer flex items-center hover:bg-slate-200 dark:hover:bg-white/15 hover:text-slate-900 dark:hover:text-white transition-all duration-300" onClick={() => onEdit(lead)} title="Edit">
          <Edit2 size={14} />
        </button>
        <button className="bg-slate-100 dark:bg-white/10 border-none rounded-md px-2 py-1.5 text-slate-500 dark:text-slate-400 cursor-pointer flex items-center hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300" onClick={() => onDelete(lead._id || lead.id)} title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </div>

    <h4 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight mb-1.5">{lead.name}</h4>
    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mb-4">{lead.company}</p>

    {/* Meta */}
    <div className="flex flex-col gap-2 mb-4">
      {lead.email && (
        <span className="flex items-center gap-2 text-[12px] font-medium text-slate-500 dark:text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap">
          <Mail size={13} /> {lead.email}
        </span>
      )}
      {lead.phone && (
        <span className="flex items-center gap-2 text-[12px] font-medium text-slate-500 dark:text-slate-400">
          <Phone size={13} /> {lead.phone}
        </span>
      )}
    </div>

    {lead.value > 0 && (
      <div className="flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/12 px-3 py-1.5 rounded-md mt-4 w-fit">
        <DollarSign size={14} />
        ₹{Number(lead.value).toLocaleString('en-IN')}
      </div>
    )}

    {lead.notes && (
      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-4 pt-4 border-t border-slate-100 dark:border-white/10 leading-relaxed overflow-hidden line-clamp-2">{lead.notes}</p>
    )}
  </div>
);

const KanbanBoard = ({ leads, onEdit, onDelete, onStatusChange, onNewLead }) => {
  const [draggedLead, setDraggedLead] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(colId);
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== colId) {
      onStatusChange(draggedLead._id || draggedLead.id, colId);
    }
    setDraggedLead(null);
    setDragOverCol(null);
  };

  return (
    <div className="p-8 sm:p-10 lg:p-12 h-full flex flex-col max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10 flex-shrink-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-900 dark:text-white">Lead Pipeline</h1>
          <p className="text-[15px] sm:text-base text-slate-500 dark:text-slate-400">Drag and drop leads to update their stage in the sales pipeline.</p>
        </div>
        <button onClick={onNewLead} className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-[15px] bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer w-full sm:w-auto">
          + Add New Lead
        </button>
      </div>

      {/* Board */}
      <div className="flex gap-8 overflow-x-auto flex-1 pb-6 w-full snap-x">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          const isDragOver = dragOverCol === col.id;
          return (
            <div
              key={col.id}
              className={`min-w-[320px] w-[320px] snap-center bg-slate-50 dark:bg-white/[0.04] border rounded-2xl flex flex-col flex-shrink-0 transition-all duration-300 ${isDragOver ? 'bg-blue-50 dark:bg-blue-500/[0.08] border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]' : 'border-slate-200 dark:border-white/10'}`}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              onDragLeave={() => setDragOverCol(null)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between p-6 pb-5 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-transparent rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${col.color}`}></span>
                  <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">{col.label}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${col.textColor} ${col.lightBg}`}>
                  {colLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-5 flex flex-col gap-5 flex-1 overflow-y-auto min-h-[100px]">
                {colLeads.length === 0 && (
                  <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl p-8 text-center bg-white/50 dark:bg-transparent">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Drop leads here</p>
                  </div>
                )}
                {colLeads.map((lead) => (
                  <LeadCard
                    key={lead._id || lead.id}
                    lead={lead}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-slate-200 dark:border-white/10 text-[13px] font-bold text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-transparent rounded-b-2xl">
                {colLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0) > 0
                  ? `₹${colLeads.reduce((s, l) => s + Number(l.value), 0).toLocaleString('en-IN')}`
                  : '—'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
