import { Bell, Menu, Search } from 'lucide-react';
import '../styles/header.css';

export default function Header({ title, subtitle, onMenuClick, onSearchClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button mobile-menu-button" onClick={onMenuClick} aria-label="Open menu"><Menu size={21} /></button>
        <div><h1>{title}</h1><p>{subtitle}</p></div>
      </div>
      <div className="topbar-actions">
        <button className="topbar-search" onClick={onSearchClick}><Search size={17} /><span>Search employees</span><kbd>/</kbd></button>
        <div className="topbar-divider" />
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><i /></button>
        <div className="user-profile"><div className="avatar avatar-admin">A</div><div className="user-profile-copy"><strong>Admin</strong><span>Administrator</span></div></div>
      </div>
    </header>
  );
}
