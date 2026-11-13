import { ArrowUpRight, BriefcaseBusiness, IndianRupee, UserCheck, Users } from 'lucide-react';
import '../styles/stat-card.css';

const iconMap = { users: Users, active: UserCheck, departments: BriefcaseBusiness, payroll: IndianRupee };

export default function StatCard({ label, value, helper, type }) {
  const Icon = iconMap[type] || Users;
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-icon-${type}`}><Icon size={20} strokeWidth={2} /></div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-helper"><span>{helper}</span><ArrowUpRight size={14} /></div>
    </article>
  );
}
