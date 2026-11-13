import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import '../styles/toast.css';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  const Icon = toast.type === 'error' ? AlertCircle : CheckCircle2;
  return <div className={`toast toast-${toast.type || 'success'}`} role="status"><Icon size={19} /><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={onClose}><X size={16} /></button></div>;
}
