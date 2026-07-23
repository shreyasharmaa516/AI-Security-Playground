import Spinner from './Spinner';
import './Button.css';

const VARIANT_CLASS = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  ghost: 'btn--ghost',
};

/**
 * Button
 * Three variants per the design spec: primary (filled blue, one per view),
 * secondary (bordered), ghost (no border/bg). Accepts a leading icon, or
 * pass `loading` to swap it for a spinner and disable the button.
 */
export default function Button({
  variant = 'secondary',
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.secondary;

  return (
    <button
      type="button"
      className={`btn ${variantClass} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner size={14} /> : Icon && <Icon size={15} strokeWidth={1.75} />}
      {children}
    </button>
  );
}
