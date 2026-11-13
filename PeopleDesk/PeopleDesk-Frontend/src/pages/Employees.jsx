import { Search, SlidersHorizontal, UserPlus, X } from 'lucide-react';
import EmployeeTable from '../components/EmployeeTable.jsx';
import '../styles/employees.css';

export default function Employees({ employees, loading, search, onSearch, status, onStatusChange, onAdd, onEdit, onDelete, totalCount = employees.length }) {
  const filtered = employees.filter((employee) => {
    const currentStatus = (employee.employmentStatus || 'ACTIVE').toUpperCase().replaceAll(' ', '_');
    return status === 'ALL' || currentStatus === status;
  });

  return <div className="page-content employees-page">
    <div className="employees-page-heading"><div><div className="breadcrumb">WORKSPACE <span>/</span> EMPLOYEES</div><h2>All employees</h2><p>Manage your people, records and team information.</p></div><button className="button button-primary add-employee-button" onClick={onAdd}><UserPlus size={17}/> Add employee</button></div>
    <section className="panel employees-panel">
      <div className="employees-toolbar"><div className="employees-count"><strong>Employee directory</strong><span>{search.trim() ? `${employees.length} results` : `${totalCount} ${totalCount === 1 ? 'person' : 'people'}`}</span></div><div className="employees-controls"><label className="search-field"><Search size={17}/><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search name, email, ID..." aria-label="Search employees"/>{search && <button onClick={() => onSearch('')} aria-label="Clear search"><X size={15}/></button>}</label><label className="filter-field"><SlidersHorizontal size={16}/><select value={status} onChange={(event) => onStatusChange(event.target.value)} aria-label="Filter by status"><option value="ALL">All statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="ON_LEAVE">On leave</option></select></label></div></div>
      <EmployeeTable employees={filtered} loading={loading} onEdit={onEdit} onDelete={onDelete} emptyTitle="No matching employees" emptyText="Try another keyword or change the status filter." />
      <div className="table-footer"><span>Showing <strong>{filtered.length}</strong>{search.trim() ? ' search results' : ` of ${totalCount} employees`}</span><span>PeopleDesk directory</span></div>
    </section>
  </div>;
}
