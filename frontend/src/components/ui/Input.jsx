import './Input.css';

/**
 * Input
 * Generic single-line text input. Optional leading icon (e.g. search).
 * Reusable across any page with a form field or search box.
 */
export default function Input({ icon: Icon, className = '', ...rest }) {
  return (
    <div className={`input-wrap ${className}`}>
      {Icon && <Icon size={15} strokeWidth={1.75} className="input-wrap__icon" />}
      <input className={`input ${Icon ? 'input--with-icon' : ''}`} {...rest} />
    </div>
  );
}
