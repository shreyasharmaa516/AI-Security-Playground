import './Switch.css';

/**
 * Switch
 * A simple on/off toggle. Used across Settings (notifications, security
 * options) and reusable anywhere else a boolean preference is exposed.
 */
export default function Switch({ checked, onChange, disabled = false, label }) {
  return (
    <label className={`switch ${disabled ? 'switch--disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-label={label}
      />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
    </label>
  );
}
