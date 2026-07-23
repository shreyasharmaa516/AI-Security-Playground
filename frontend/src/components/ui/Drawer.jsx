import { X } from 'lucide-react';
import './Drawer.css';

/**
 * Drawer
 * Slides in from the right, keeping whatever's behind it (a table, a list)
 * visible and in context — used instead of a modal for History's row
 * detail view. Reusable anywhere the same pattern applies later.
 */
export default function Drawer({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="drawer__overlay" onMouseDown={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="drawer__header">
          <h2 className="text-h2">{title}</h2>
          <button type="button" className="drawer__close" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={1.75} />
          </button>
        </header>
        <div className="drawer__body">{children}</div>
      </aside>
    </div>
  );
}
