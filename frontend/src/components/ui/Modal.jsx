import { X } from 'lucide-react';
import './Modal.css';

/**
 * Modal
 * Centered dialog with overlay, no blur (blur = glassmorphism, avoided per
 * the design spec). Used by Reports' "Generate Report" flow; reusable
 * anywhere else a config or confirmation dialog is needed later.
 */
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div className="modal__overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <h2 className="text-h2">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={1.75} />
          </button>
        </header>

        <div className="modal__body">{children}</div>

        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}
