import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import '../styles/employee-form.css';

const blankEmployee = {
  employeeCode: '', firstName: '', lastName: '', email: '', phone: '', gender: '',
  dateOfBirth: '', department: '', designation: '', salary: '', dateOfJoining: '', employmentStatus: 'ACTIVE',
};

export default function EmployeeFormModal({ employee, onClose, onSave, saving }) {
  const [form, setForm] = useState(blankEmployee);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({ ...blankEmployee, ...employee, salary: employee.salary ?? '' });
    } else {
      setForm(blankEmployee);
    }
    setErrors({});
  }, [employee]);

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape' && !saving) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, saving]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function validate() {
    const next = {};
    ['employeeCode', 'firstName', 'lastName', 'email', 'department', 'designation', 'salary', 'dateOfJoining'].forEach((field) => {
      if (!String(form[field] ?? '').trim()) next[field] = 'This field is required.';
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.salary !== '' && Number(form.salary) < 0) next.salary = 'Salary cannot be negative.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (!validate()) return;
    const payload = { ...form, salary: Number(form.salary) };
    if (!employee) delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;
    onSave(payload);
  }

  const field = (name, label, options = {}) => (
    <div className={`form-field ${errors[name] ? 'field-error' : ''}`}>
      <label htmlFor={name}>{label}{options.required && <span> *</span>}</label>
      {options.options ? <select id={name} name={name} value={form[name] ?? ''} onChange={updateField}>
        <option value="">Select {label.toLowerCase()}</option>{options.options.map((item) => <option key={item} value={item}>{item}</option>)}
      </select> : <input id={name} name={name} type={options.type || 'text'} value={form[name] ?? ''} onChange={updateField} placeholder={options.placeholder || ''} min={options.type === 'number' ? '0' : undefined} step={options.type === 'number' ? '0.01' : undefined} />}
      {errors[name] && <small>{errors[name]}</small>}
    </div>
  );

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) onClose(); }}>
      <section className="employee-modal" role="dialog" aria-modal="true" aria-labelledby="employee-modal-title">
        <div className="modal-header"><div><span className="modal-eyebrow">EMPLOYEE RECORD</span><h2 id="employee-modal-title">{employee ? 'Edit employee' : 'Add new employee'}</h2><p>{employee ? 'Update the employee details below.' : 'Enter the details to add someone to your team.'}</p></div><button className="icon-button modal-close" onClick={onClose} disabled={saving} aria-label="Close modal"><X size={20} /></button></div>
        <form onSubmit={submit}>
          <div className="form-section"><h3>Personal information</h3><div className="form-grid">
            {field('employeeCode', 'Employee ID', { required: true, placeholder: 'e.g. EMP004' })}
            {field('gender', 'Gender', { options: ['Male', 'Female', 'Other', 'Prefer not to say'] })}
            {field('firstName', 'First name', { required: true, placeholder: 'First name' })}
            {field('lastName', 'Last name', { required: true, placeholder: 'Last name' })}
            {field('email', 'Email address', { required: true, type: 'email', placeholder: 'name@company.com' })}
            {field('phone', 'Phone number', { placeholder: '+91 98765 43210' })}
            {field('dateOfBirth', 'Date of birth', { type: 'date' })}
          </div></div>
          <div className="form-section"><h3>Work information</h3><div className="form-grid">
            {field('department', 'Department', { required: true, placeholder: 'e.g. Engineering' })}
            {field('designation', 'Designation', { required: true, placeholder: 'e.g. Software Developer' })}
            {field('salary', 'Monthly salary (₹)', { required: true, type: 'number', placeholder: 'e.g. 35000' })}
            {field('dateOfJoining', 'Date of joining', { required: true, type: 'date' })}
            {field('employmentStatus', 'Employment status', { options: ['ACTIVE', 'INACTIVE', 'ON_LEAVE'] })}
          </div></div>
          <div className="modal-footer"><span className="required-note">* Required fields</span><div><button type="button" className="button button-secondary" onClick={onClose} disabled={saving}>Cancel</button><button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Saving...' : employee ? 'Save changes' : 'Add employee'}</button></div></div>
        </form>
      </section>
    </div>
  );
}
