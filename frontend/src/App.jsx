import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import Dashboard from './components/Dashboard/Dashboard';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import LeadModal from './components/KanbanBoard/LeadModal';
import Team from './pages/Team';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/leads';

// Fallback seed data when backend is not connected
const SEED_LEADS = [
  { id: '1', name: 'Raj Kumar', company: 'Ramesh Industries', email: 'raj@ramesh.co', phone: '+91 98765 11111', status: 'New', value: 250000, notes: 'Interested in bulk manufacturing parts' },
  { id: '2', name: 'Anita Desai', company: 'Mahindra Corp', email: 'anita@mahindra.com', phone: '+91 98765 22222', status: 'Contacted', value: 180000, notes: 'Follow-up scheduled for next week' },
  { id: '3', name: 'Suresh Iyer', company: 'Tata Solutions', email: 'suresh@tata.in', phone: '+91 98765 33333', status: 'Meeting Scheduled', value: 320000, notes: 'Factory visit arranged' },
  { id: '4', name: 'Meera Shah', company: 'Bajaj Electronics', email: 'meera@bajaj.com', phone: '+91 98765 44444', status: 'Proposal', value: 95000, notes: '' },
  { id: '5', name: 'Karan Verma', company: 'Wipro Mfg', email: 'karan@wipro.co', phone: '+91 98765 55555', status: 'Won', value: 430000, notes: 'Contract signed for Q3' },
  { id: '6', name: 'Priya Nair', company: 'Infosys Ltd', email: 'priya@infosys.com', phone: '', status: 'New', value: 125000, notes: 'Cold lead from trade show' },
  { id: '7', name: 'Amit Patel', company: 'Godrej Industries', email: 'amit@godrej.in', phone: '+91 98765 66666', status: 'Contacted', value: 220000, notes: '' },
  { id: '8', name: 'Deepika Rao', company: 'L&T Engineering', email: 'deepika@lt.com', phone: '', status: 'Lost', value: 380000, notes: 'Went with competitor pricing' },
  { id: '9', name: 'Ravi Kulkarni', company: 'Reliance Parts', email: 'ravi@reliance.com', phone: '+91 98765 77777', status: 'Proposal', value: 170000, notes: 'Pricing discussion pending' },
  { id: '10', name: 'Sneha Joshi', company: 'Adani Works', email: 'sneha@adani.co', phone: '', status: 'Meeting Scheduled', value: 290000, notes: 'Demo scheduled Thursday' },
];

function App() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [useApi, setUseApi] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network');
      const data = await res.json();
      if (data.length === 0) {
        // Seed the database with initial data
        for (const seed of SEED_LEADS) {
          const { id, ...body } = seed;
          await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        }
        const seeded = await fetch(API_URL);
        setLeads(await seeded.json());
      } else {
        setLeads(data);
      }
    } catch {
      setUseApi(false);
      setLeads(SEED_LEADS);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSaveLead = async (leadData) => {
    if (editingLead) {
      if (useApi) {
        const res = await fetch(`${API_URL}/${editingLead._id || editingLead.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
      } else {
        setLeads((prev) => prev.map((l) => (l.id === editingLead.id ? { ...l, ...leadData } : l)));
      }
    } else {
      if (useApi) {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
        const created = await res.json();
        setLeads((prev) => [created, ...prev]);
      } else {
        setLeads((prev) => [{ ...leadData, id: Date.now().toString() }, ...prev]);
      }
    }
    setEditingLead(null);
    setShowModal(false);
  };

  const handleDeleteLead = async (id) => {
    if (useApi) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (useApi) {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setLeads((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
    } else {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    }
  };

  const openNewLead = () => { setEditingLead(null); setShowModal(true); };
  const openEditLead = (lead) => { setEditingLead(lead); setShowModal(true); };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden relative transition-colors duration-300">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Topbar onNewLead={openNewLead} onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto p-0">
            <Routes>
              <Route path="/" element={<Dashboard onNewLead={openNewLead} />} />
              <Route path="/pipeline" element={
                <KanbanBoard
                  leads={leads}
                  onEdit={openEditLead}
                  onDelete={handleDeleteLead}
                  onStatusChange={handleStatusChange}
                  onNewLead={openNewLead}
                />
              } />
              <Route path="/team" element={<Team />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
            </Routes>
          </div>
        </div>

        {showModal && (
          <LeadModal
            lead={editingLead}
            onClose={() => { setShowModal(false); setEditingLead(null); }}
            onSave={handleSaveLead}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
