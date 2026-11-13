import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import '../styles/employee-table.css';

function initials(employee) {
  return `${employee.firstName?.[0] || ''}${employee.lastName?.[0] || ''}`.toUpperCase() || 'E';
}

export default function EmployeeTable({ employees, onEdit, onDelete, compact = false, loading = false, emptyTitle = 'No employees found', emptyText = 'Try changing your search or add a new employee.' }) {
  const [menuId, setMenuId] = useState(null);

  if (loading) return <div className="table-state"><div className="spinner" /><span>Loading employees...</span></div>;
  if (!employees.length) return <div className="table-state empty-state"><div className="empty-icon"><Users size={24} /></div><strong>{emptyTitle}</strong><span>{emptyText}</span></div>;

  return (
    <div className="employee-table-wrap">
      <table className={`employee-table ${compact ? 'employee-table-compact' : ''}`}>
        <thead><tr>
          <th>EMPLOYEE <ArrowUpDown size={12} /></th><th>DEPARTMENT</th><th>DESIGNATION</th><th>STATUS</th>{!compact && <th>JOINED DATE</th>}<th><span className="sr-only">Actions</span></th>
        </tr></thead>
        <tbody>{employees.map((employee) => {
          const status = (employee.employmentStatus || 'ACTIVE').toUpperCase();
          return <tr key={employee.id}>
            <td><div className="employee-identity"><div className="avatar employee-avatar">{initials(employee)}</div><div className="employee-identity-copy"><strong>{employee.firstName} {employee.lastName}</strong><span>{employee.email}</span></div></div></td>
            <td><span className="table-primary-text">{employee.department || '—'}</span></td>
            <td><span className="table-secondary-text">{employee.designation || '—'}</span></td>
            <td><span className={`status-pill status-${status.toLowerCase()}`}><i />{status}</span></td>
            {!compact && <td><span className="table-secondary-text">{formatDate(employee.dateOfJoining)}</span></td>}
            <td className="table-action-cell"><div className="row-action-wrap">
              <button className="icon-button row-more-button" aria-label={`Actions for ${employee.firstName}`} onClick={() => setMenuId(menuId === employee.id ? null : employee.id)}><MoreHorizontal size={19} /></button>
              {menuId === employee.id && <><button className="menu-dismiss" aria-label="Close actions" onClick={() => setMenuId(null)} /><div className="row-action-menu"><button onClick={() => { onEdit(employee); setMenuId(null); }}><Pencil size={15} />Edit employee</button><button className="danger-menu-item" onClick={() => { onDelete(employee); setMenuId(null); }}><Trash2 size={15} />Delete employee</button></div></>}
            </div></td>
          </tr>;
        })}</tbody>
      </table>
    </div>
  );
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
