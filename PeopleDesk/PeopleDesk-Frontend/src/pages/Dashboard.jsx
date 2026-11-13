import { ArrowRight, Plus, UsersRound } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import EmployeeTable from '../components/EmployeeTable.jsx';
import '../styles/dashboard.css';

export default function Dashboard({ employees, loading, onNavigate, onAdd, onEdit, onDelete }) {
  const active = employees.filter((item) => (item.employmentStatus || 'ACTIVE').toUpperCase() === 'ACTIVE').length;
  const departments = new Set(employees.map((item) => item.department).filter(Boolean)).size;
  const payroll = employees.reduce((sum, item) => sum + Number(item.salary || 0), 0);
  const recent = [...employees].sort((a, b) => String(b.dateOfJoining || '').localeCompare(String(a.dateOfJoining || ''))).slice(0, 5);
  const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payroll);

  return <div className="page-content dashboard-page">
    <div className="welcome-banner"><div className="welcome-content"><span className="welcome-label">YOUR TEAM AT A GLANCE</span><h2>Good to see you, Admin <span>✦</span></h2><p>Here's what's happening across your team today.</p><button className="welcome-action" onClick={() => onNavigate('employees')}>Explore employees <ArrowRight size={15} /></button></div><div className="welcome-art"><div className="art-circle art-circle-one"/><div className="art-circle art-circle-two"/><div className="art-person art-person-one"/><div className="art-person art-person-two"/><div className="art-person art-person-three"/><div className="art-sparkle">✦</div></div></div>

    <div className="section-heading stats-heading"><div><h2>Overview</h2><p>A snapshot of your employee records.</p></div><span className="live-indicator"><i/> LIVE DATA</span></div>
    <div className="stats-grid">
      <StatCard label="Total employees" value={loading ? '—' : employees.length} helper="People in your workspace" type="users" />
      <StatCard label="Active employees" value={loading ? '—' : active} helper="Currently active" type="active" />
      <StatCard label="Departments" value={loading ? '—' : departments} helper="Across your organization" type="departments" />
      <StatCard label="Monthly payroll" value={loading ? '—' : money} helper="Based on listed salaries" type="payroll" />
    </div>

    <section className="panel recent-panel"><div className="panel-header"><div><h2>Recently joined</h2><p>Your latest employee records</p></div><button className="text-action" onClick={() => onNavigate('employees')}>View all <ArrowRight size={15} /></button></div><EmployeeTable employees={recent} loading={loading} compact onEdit={onEdit} onDelete={onDelete} emptyTitle="No employees yet" emptyText="Add your first employee to see the team here." /></section>
    <div className="dashboard-bottom-row"><div className="quick-tip"><div className="quick-tip-icon"><UsersRound size={19}/></div><div><strong>Keep your team up to date</strong><p>Accurate employee records make team management easier.</p></div></div><button className="button button-primary dashboard-add-button" onClick={onAdd}><Plus size={17}/> Add employee</button></div>
  </div>;
}
