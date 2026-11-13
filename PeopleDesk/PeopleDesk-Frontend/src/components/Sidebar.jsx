import { BriefcaseBusiness, LayoutDashboard, Users, X } from 'lucide-react';
import '../styles/sidebar.css';

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  const links = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
  ];

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark"><BriefcaseBusiness size={21} strokeWidth={2.2} /></div>
          <div className="brand-copy"><strong>PeopleDesk</strong><span>PEOPLE MANAGEMENT</span></div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={onClose}><X size={19} /></button>
        </div>

        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {links.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-link ${activePage === id ? 'active' : ''}`} onClick={() => { onNavigate(id); onClose(); }}>
              <Icon size={19} strokeWidth={1.9} /><span>{label}</span>
              {id === 'employees' && <span className="nav-link-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help-icon">?</div>
          <div><strong>PeopleDesk</strong><p>Simple tools for better teams.</p></div>
          <span className="sidebar-version">v1.0</span>
        </div>
      </aside>
    </>
  );
}
