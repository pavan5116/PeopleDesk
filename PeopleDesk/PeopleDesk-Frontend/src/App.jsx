import { useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import EmployeeFormModal from './components/EmployeeFormModal.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import Toast from './components/Toast.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Employees from './pages/Employees.jsx';
import { employeeService } from './services/employeeService.js';
import './styles/layout.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formEmployee, setFormEmployee] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [status, setStatus] = useState('ALL');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadError, setLoadError] = useState('');

  const showToast = useCallback((message, type = 'success') => setToast({ message, type }), []);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      setLoadError(error.message);
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadEmployees(); }, [loadEmployees]);

  // Use the backend search endpoint whenever the directory has a keyword.
  useEffect(() => {
    const keyword = search.trim();
    if (activePage !== 'employees' || !keyword) {
      setSearchResults(null);
      setSearchLoading(false);
      return undefined;
    }
    let cancelled = false;
    setSearchLoading(true);
    const timeout = window.setTimeout(async () => {
      try {
        const results = await employeeService.search(keyword);
        if (!cancelled) setSearchResults(results);
      } catch (error) {
        if (!cancelled) {
          setSearchResults([]);
          showToast(error.message, 'error');
        }
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    }, 300);
    return () => { cancelled = true; window.clearTimeout(timeout); };
  }, [activePage, search, showToast]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function openCreateForm() { setFormEmployee(null); setFormOpen(true); }

  async function openEditForm(employee) {
    try {
      const latestEmployee = await employeeService.getById(employee.id);
      setFormEmployee(latestEmployee || employee);
    } catch (error) {
      setFormEmployee(employee);
      showToast(`Could not refresh employee details: ${error.message}`, 'error');
    }
    setFormOpen(true);
  }

  async function saveEmployee(payload) {
    setSaving(true);
    try {
      if (formEmployee?.id != null) {
        await employeeService.update(formEmployee.id, payload);
        showToast('Employee details updated successfully.');
      } else {
        await employeeService.create(payload);
        showToast('New employee added successfully.');
      }
      setFormOpen(false);
      setFormEmployee(null);
      setSearch('');
      setSearchResults(null);
      await loadEmployees();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function deleteEmployee() {
    if (!employeeToDelete) return;
    setDeleting(true);
    try {
      await employeeService.remove(employeeToDelete.id);
      showToast('Employee deleted successfully.');
      setEmployeeToDelete(null);
      setSearch('');
      setSearchResults(null);
      await loadEmployees();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setDeleting(false);
    }
  }

  function focusSearch() {
    setActivePage('employees');
    window.setTimeout(() => document.querySelector('.search-field input')?.focus(), 50);
  }

  useEffect(() => {
    const handler = (event) => {
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        event.preventDefault(); focusSearch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const pageMeta = activePage === 'dashboard'
    ? { title: 'Overview', subtitle: 'Welcome back. Here is your team summary.' }
    : { title: 'Employees', subtitle: 'Your people, all in one place.' };

  return <div className="app-shell">
    <Sidebar activePage={activePage} onNavigate={setActivePage} open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    <main className="main-area">
      <Header {...pageMeta} onMenuClick={() => setMobileNavOpen(true)} onSearchClick={focusSearch} />
      {loadError && <div className="connection-banner"><span>{loadError}</span><button onClick={loadEmployees}><RefreshCw size={15}/> Retry</button></div>}
      {activePage === 'dashboard'
        ? <Dashboard employees={employees} loading={loading} onNavigate={setActivePage} onAdd={openCreateForm} onEdit={openEditForm} onDelete={setEmployeeToDelete} />
        : <Employees employees={search.trim() ? (searchResults || []) : employees} loading={search.trim() ? searchLoading : loading} search={search} onSearch={setSearch} status={status} onStatusChange={setStatus} onAdd={openCreateForm} onEdit={openEditForm} onDelete={setEmployeeToDelete} totalCount={employees.length} />}
      <footer className="app-footer"><span>© {new Date().getFullYear()} PeopleDesk</span><span>Employee management, made simple.</span></footer>
    </main>
    {formOpen && <EmployeeFormModal employee={formEmployee} onClose={() => { if (!saving) { setFormOpen(false); setFormEmployee(null); } }} onSave={saveEmployee} saving={saving} />}
    <ConfirmDialog employee={employeeToDelete} onCancel={() => { if (!deleting) setEmployeeToDelete(null); }} onConfirm={deleteEmployee} deleting={deleting} />
    <Toast toast={toast} onClose={() => setToast(null)} />
  </div>;
}
