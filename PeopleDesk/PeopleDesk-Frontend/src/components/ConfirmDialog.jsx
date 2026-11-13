import { AlertTriangle, X } from 'lucide-react';
import '../styles/confirm-dialog.css';

export default function ConfirmDialog({ employee, onCancel, onConfirm, deleting }) {
  if (!employee) return null;
  return (
    <div className="modal-backdrop confirm-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !deleting) onCancel(); }}>
      <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <button className="icon-button confirm-close" onClick={onCancel} disabled={deleting} aria-label="Close"><X size={18} /></button>
        <div className="confirm-icon"><AlertTriangle size={23} /></div>
        <h2 id="confirm-title">Delete employee?</h2>
        <p>Are you sure you want to delete <strong>{employee.firstName} {employee.lastName}</strong>? This action cannot be undone.</p>
        <div className="confirm-actions"><button className="button button-secondary" onClick={onCancel} disabled={deleting}>Cancel</button><button className="button button-danger" onClick={onConfirm} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete employee'}</button></div>
      </section>
    </div>
  );
}
